import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { loginIntoAccount } from "@/lib/serverActions/auth"
import { loginWithGoogle } from "@/lib/serverActions/auth"

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                username: {},
                password: {}
            },
            async authorize(credentials) {
                if (credentials) {
                    const { username, password } = credentials

					const res = await loginIntoAccount(username, password)

					if (res.ok) {
						const { userInfo, tokens } = res.data

						const user = {
							id: userInfo.userId,
							userInfo,
							tokens
						}

						console.log("tokens", tokens)

						return user
					} else {
						throw new Error("Authorize failed")
					}
                }

                throw new Error("Empty credentials")
            }
        })
    ],
    callbacks: {
        async jwt({ token, user, account, trigger }) {
			token.user = user

			if (account && account.provider === "google" && trigger === "signIn") {
				const {id_token} = account

				if (id_token) {
					const res = await loginWithGoogle(id_token)

					if (res.ok) {
						token.user = {
							id: res.data.userInfo.userId,
							...res.data
						}
					}

					/** TODO: fix token interface
					 *
					 * if res.ok = false token user will be google user */
				}
			}

            return token
        },
        async session({ session, token }) {
			session.user = token.user

            return session
        },
        // async signIn({user, account}) {
        //     return "OpaCHIRIK"
        // }
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET!,
    // TODO: check
    // pages: {
    //     signIn: "/",
    //     signOut: "/auth"
    // }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
