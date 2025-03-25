"use client"

import { SessionProvider as NextSessionProvider } from "next-auth/react"
import { Session } from "next-auth"

type SessionProviderProps = {
    children: React.ReactNode,
    session: Session | null,
}

const SessionProvider = ({children, session}: SessionProviderProps) => {
    return (
        <NextSessionProvider session={session}>
            {children}
        </NextSessionProvider>
    )
}

export default SessionProvider
