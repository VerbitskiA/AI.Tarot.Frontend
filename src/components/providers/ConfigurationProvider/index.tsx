"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import fetchService from "@/configs/http-service/fetch-settings"
import { ConfigurationType } from "@/lib/types/config.types"
import { useSession } from "next-auth/react"

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
    const {data, status, update} = useSession()

    const fetchConfiguration = async () => {
        const tokens = data?.user.tokens

        // if (!tokens) {
        //     const accessToken = localStorage.getItem(TOKENS_KEYS.ACCESS_TOKEN)
        //     const refreshToken = localStorage.getItem(TOKENS_KEYS.REFRESH_TOKEN)

        //     if (accessToken && refreshToken) {
        //         tokens = {
        //             accessToken,
        //             refreshToken
        //         }
        //     }
        // }

        if (tokens) {
            const { accessToken, refreshToken } = tokens

            const res = await fetchService.get<ConfigurationType>(
                "/api/configuration",
                {
                    credentials: "include",
                    /* source - usless now */

                    isClientSource: true,

                    /* these headers are default */

                    // headers: {
                    // 	'Content-Type': 'application/json',
                    // 	'Accept': '*/*',
                    // },
                    tokens: {
                        accessToken,
                        refreshToken
                    }
                }
            )

            if (res.ok && res.data) {
                setConfiguration(res.data)
            }
        }
    }

    // useEffect(() => {
    //     fetchConfiguration() // Получаем конфигурацию при первом рендере
    // }, [])

    useEffect(() => {
        if (status === "authenticated" || status === "unauthenticated") {
            fetchConfiguration()
        }
    }, [status])

    return (
        <ConfigurationContext.Provider
            value={{ configuration, fetchConfiguration }}
        >
            {children}
        </ConfigurationContext.Provider>
    )
}
