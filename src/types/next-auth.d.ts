import NextAuth from "next-auth"

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `Provider` React Context
     */
    interface Session {
        user: {
            // TODO
            /** The user's postal address. */
            userId: string,
            username: string,
            balance: number,
        }
    }
}
