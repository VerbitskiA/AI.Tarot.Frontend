import { TokensData } from "@/lib/types/responsesData"

type Provider = "credentials" | "google"

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `Provider` React Context
     */
    interface User {
        // DefaultUser:
        // id: string
        // name?: string | null
        // email?: string | null
        // image?: string | null

        tokens: TokensData
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
            // name?: string | null
            // email?: string | null
            // image?: string | null

            tokens: TokensData
            userInfo: {
                userId: string
                username: string
                balance: number
            }
        }
    }
}
