"use client"

import { SessionProvider as NextSessionProvider } from "next-auth/react"
import { Session } from "next-auth"
import { useEffect } from "react"
import { TOKENS_KEYS } from "@/configs/http-service/constants/authTokens"
import { refreshToken } from "@/lib/serverActions/auth"
import { signIn } from "next-auth/react"

type SessionProviderProps = {
    children: React.ReactNode,
    session: Session | null,
}

const SessionProvider = ({children, session}: SessionProviderProps) => {
	useEffect(() => {
		const lsRefreshToken = localStorage.getItem(TOKENS_KEYS.REFRESH_TOKEN)

		const refreshMyToken = async (token: string) => {
			const res = await refreshToken(token, true)

			if (res.ok) {
				signIn("tokenProvider", res.data)
			}
			else {
				localStorage.removeItem(TOKENS_KEYS.REFRESH_TOKEN)
			}
		}

		if (!session && lsRefreshToken) {
			refreshMyToken(lsRefreshToken)
		}
	}, [session])

    return (
        <NextSessionProvider session={session}>
            {children}
        </NextSessionProvider>
    )
}

export default SessionProvider
