import NextAuth from "next-auth"

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `Provider` React Context
     */
    interface User {
        // id is required on DefaultUser type, userId = id
        id: string
        tokens: {
            accessToken: string
            refreshToken: string
        }
        userInfo: {
            userId: string
            username: string
            balance: number
        }
    }
    interface Session {
        user: User
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        user: {
            // id is required on DefaultUser type, userId = id
            id: string
            tokens: {
                accessToken: string
                refreshToken: string
            }
            userInfo: {
                userId: string
                username: string
                balance: number
            }
        }
    }
}
