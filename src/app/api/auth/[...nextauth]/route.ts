import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import fetchService from '@/configs/http-service/fetch-settings'
import { LoginData } from '@/lib/types/responsesData'

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID ?? "",
            clientSecret: process.env.GOOGLE_SECRET ?? "",
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                username: {},
                password: {}
            },
            async authorize(credentials) {
                const res = await fetchService.post<LoginData>('/api/auth/login', {
                    body: JSON.stringify({
                        email: credentials?.username,
                        password: credentials?.password,
                    }),
                })

                if (res.ok) {
                    const {userInfo, tokens} = res.data

                    const user = {
                        id: userInfo.userId,
                        userInfo,
                        tokens,
                    }

                    return user
                }
                // TODO: handle statuses
                else throw new Error("Login failed")
            }
        })
    ],
    // callbacks: {
    //     async jwt({token, user}) {
    //         if (user) {
    //             token.user = user
    //         }
            
    //         return Promise.resolve(token)
    //     },
    //     async session({ session, token }) {
    //         session.user = token.user

    //         return session
    //     },
    // },
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
    // TODO: check
    pages: {
        signIn: "/auth"
    },
}

const handler = NextAuth(authOptions)

export { 
    handler as GET,
    handler as POST
}
