import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { RejectActionResponse } from "@/configs/http-service/fetch-settings/types"
import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { loginIntoAccount } from "@/lib/serverActions/auth"
import { loginWithGoogle } from "@/lib/serverActions/auth"
import { OAuthConfig } from "next-auth/providers/oauth"
import { TokensData } from "@/lib/types/responsesData"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const defaultFetchErrorMessage = (queryName: string) => {
    return `Something went wrong with ${queryName}`
}

// /**
//  * Function for generating of catch block error
//  *
//  * @param error
//  * @param queryName
//  * @returns
//  */
// export const fetchError = (error: unknown, queryName: string) => {
//     if (error instanceof Error) {
//         return error
//     }

//     const errorMessage = defaultFetchErrorMessage(queryName)

//     console.error(errorMessage)
//     return new Error(errorMessage)
// }

export const defaultFormServerActionError = (error: unknown, defaultErrorMessage: string): RejectActionResponse => {
    if (error instanceof Error) {
        return {
            status: "error",
            message: error.message
        }
    }

    return {
        status: "error",
        message: defaultErrorMessage
    }
}

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

						return user
					}
                }

                return null
            }
        }),
		{
			name: "tokenProvider",
			async authorize(tokens: TokensData) {
				console.log("tokens", tokens)
				return tokens
			}
		} as unknown as OAuthConfig<"tokenProvider">
    ] ,
    callbacks: {
        async jwt({ token, user, account, trigger }) {
			if (user) {
				token.user = user
			}

			if (account
				&& user
				&& account.provider === "google"
				&& trigger === "signIn"
			) {
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
			if (session) {
				session.user = token.user
			}

            return session
        },
        // async signIn({user, account}) {
        //     return true
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
