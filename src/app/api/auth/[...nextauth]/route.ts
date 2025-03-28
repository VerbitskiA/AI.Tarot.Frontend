import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { loginIntoAccount } from "@/lib/serverActions/auth"

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID ?? "",
            clientSecret: process.env.GOOGLE_SECRET ?? ""
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

                    try {
                        const res = await loginIntoAccount(username, password)

                        if (res.ok) {
                            const { userInfo, tokens } = res.data

                            const user = {
                                id: userInfo.userId,
                                userInfo,
                                tokens
                            }

                            return user
                        } else {
                            throw new Error("Authorize failed")
                        }
                        
                    } catch (error: unknown) {
                        if (error instanceof Error) {
                            throw error
                        }
                
                        throw new Error("Something went wrong with authorize")
                    }
                }

                throw new Error("Empty credentials")
            }
        })
    ],
    callbacks: {
        async jwt({ token, user, account }) {
            console.log({
                token,
                user,
                account
            })
            if (user) {
                token.user = user
            }

            if (account) {
                token.provider = account.provider
            }

            return Promise.resolve(token)
        },
        async session({ session, token }) {
            if (token?.user) {
                session.user = token.user
            }

            return session
        },
        // async signIn() {

        // }
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
    // TODO: check
    pages: {
        // signIn: "/auth/onboard",
        signOut: "/auth"
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
