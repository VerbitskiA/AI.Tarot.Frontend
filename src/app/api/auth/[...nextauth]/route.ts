import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { SessionStrategy } from 'next-auth'

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }),
    ],
    session: {
        strategy: 'jwt' as SessionStrategy,
    },
    secret: process.env.NEXTAUTH_SECRET as string
}

const handler = NextAuth(authOptions)

export { 
    handler as GET,
    handler as POST
}
