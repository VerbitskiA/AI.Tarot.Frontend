"use client"

import React, { createContext, useCallback, useContext, useEffect, useState } from "react"
import fetchService from "@/configs/http-service/fetch-settings"
import { ConfigurationType } from "@/lib/types/config.types"
import { useSession } from "next-auth/react"
import { TOKENS_KEYS } from "@/configs/http-service/constants/authTokens"
import { FetchOptionsT } from "@/configs/http-service/fetch-settings/types"

interface ConfigurationContextType {
    configuration: ConfigurationType | null
    fetchConfiguration: () => Promise<void>
}

const ConfigurationContext = createContext<
    ConfigurationContextType | undefined
>(undefined)

export const useConfiguration = () => {
    const context = useContext(ConfigurationContext)
    if (context === undefined) {
        throw new Error(
            "useConfiguration must be used within a ConfigurationProvider"
        )
    }
    return context
}

export const ConfigurationProvider: React.FC<{ children: React.ReactNode }> = ({
    children
}) => {
    const [configuration, setConfiguration] =
        useState<ConfigurationType | null>(null)
    const {data, status} = useSession()

    const fetchConfiguration = useCallback(async () => {
			const fetchOptions: FetchOptionsT = data
				? {
					credentials: "include",
					isClientSource: true,
					isNeedAitaAuth: true,
				}
				: {
					isClientSource: true,
				}

            const res = await fetchService.get<ConfigurationType>(
                "/api/configuration",
                fetchOptions
            )

            if (res.ok && res.data) {
                setConfiguration(res.data)
            }
    }, [data])

    useEffect(() => {
        fetchConfiguration() // Получаем конфигурацию при первом рендере
    }, [])

    useEffect(() => {
		const lsRefreshToken = localStorage.getItem(TOKENS_KEYS.REFRESH_TOKEN)

        if (status === "unauthenticated" && lsRefreshToken) {
			localStorage.removeItem(TOKENS_KEYS.REFRESH_TOKEN)
        }

		if (status === "authenticated" && data.user.tokens.refreshToken && !lsRefreshToken) {
			localStorage.setItem(TOKENS_KEYS.REFRESH_TOKEN, data.user.tokens.refreshToken)
		}

		fetchConfiguration()
    }, [status, data, fetchConfiguration])

    return (
        <ConfigurationContext.Provider
            value={{ configuration, fetchConfiguration }}
        >
            {children}
        </ConfigurationContext.Provider>
    )
}
