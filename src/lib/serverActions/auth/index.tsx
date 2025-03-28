"use server"
import fetchService from "@/configs/http-service/fetch-settings"
import { ActionResponse } from "@/configs/http-service/fetch-settings/types"
// import { ConfigurationType } from "@/lib/types/config.types"
import { GoogleLoginData, LoginData } from "@/lib/types/responsesData"
import { TOKENS_KEYS } from "@/configs/http-service/constants/authTokens"
import { TokensData } from "@/lib/types/responsesData"
import { fetchError } from "@/lib/utils"
// import { headers } from "next/headers"
import { defaultFormServerActionError } from "@/lib/utils"

// const getConfiguration = async (tokens: TokensData): Promise<
//     ConfigurationType | { detail: string }
// > => {
//     const res = await fetchService.get<ConfigurationType>(
//         `/api/configuration`,
//         {
//             headers: {
//                 "Content-Type": "application/json",
//                 Accept: "*/*"
//             },
//             tokens
//         }
//     )
//     return res.data
// }

const checkIsEmailExist = async (email: string) => {
    try {
        const res = await fetchService.get<boolean>("/api/auth/exists", {
            params: { email }
        })

        if (res.ok) {
            // res.data = true when EMAIL already exists
            if (res.data === true) {
                return true
            }

            return false
        }

        const message = res.data.detail
        throw new Error(message)
    } catch (error: unknown) {
        throw fetchError(error, "checkIsEmailExist")
    }
}

const loginWithGoogle = async (googleToken: string) => {
    try {
        const res = await fetchService.post<GoogleLoginData>("/api/auth/google", {
            body: JSON.stringify({
                token: googleToken
            })
        })

        return res
    } catch (error: unknown) {
        throw fetchError(error, "loginWithGoogle")
    }
}

const loginIntoAccount = async (
    username: string,
    password: string
) => {
    try {
        const res = await fetchService.post<LoginData>("/api/auth/login", {
            body: JSON.stringify({
                email: username,
                password
            }),
            credentials: "include"
        })

        return res
    } catch (error: unknown) {
        throw fetchError(error, "loginIntoAccount")
    }
}

const registerAccount = async (
    username: string,
    email: string,
    password: string,
    dateOfBirth: string,
    gender: string
) => {
    try {
        const res = await fetchService.post<LoginData>("/api/auth/register", {
            body: JSON.stringify({
                username,
                email,
                password,
                dateOfBirth,
                gender
            })
        })

        return res
    } catch (error: unknown) {
        throw fetchError(error, "loginIntoAccount")
    }
}

const logoutUser = async (tokens: TokensData) => {
    try {
        const res = await fetchService.post("/api/auth/revoke", {
            body: JSON.stringify({
                [TOKENS_KEYS.REFRESH_TOKEN]: tokens.refreshToken
            }),
            tokens: tokens,
        })

        return res
    } catch (error: unknown) {
        throw fetchError(error, "loginIntoAccount")
    }
}

const refreshToken = async (tokens: TokensData) => {
    try {
        const res = await fetchService.post<TokensData>("/api/auth/revoke", {
            body: JSON.stringify({
                [TOKENS_KEYS.REFRESH_TOKEN]: tokens.refreshToken
            }),
            tokens: tokens,
        })

        return res
    } catch (error: unknown) {
        throw fetchError(error, "refreshToken")
    }
}

const resetPassword = async (fd: FormData): Promise<ActionResponse> => {
    try {
        const response = await fetchService.post(
            "authentication/reset_password/",
            {
                body: JSON.stringify({
                    email: fd.get("email")
                })
            }
        )
        if (!response.ok) {
            const message = response.data.detail
            throw new Error(message)
        } else {
            return {
                status: "ok",
                message: "Письмо отправлено на вашу почту"
            }
        }
    } catch (e) {
        return defaultFormServerActionError(e, "Не удалось отправить письмо")
    }
}

const confirmReset = async (fd: FormData): Promise<ActionResponse> => {
    return {
        status: "ok",
        message: "Вы успешно сменили свой пароль"
    }
}

const approveEmail = async (fd: FormData): Promise<ActionResponse> => {
    try {
        const res = await fetchService.post(`/api/auth/confirm-email`, {
            body: JSON.stringify({
                code: "1111"
            })
        })
        if (!res.ok) {
            const message = res.data.detail
            throw new Error(message)
        } else {
            return {
                status: "ok",
                message: "Вы успешно подтвердили вашу почту"
            }
        }
    } catch (e) {
        if (e instanceof Error) {
            return {
                status: "error",
                message: e.message
            }
        }
        return {
            status: "error",
            message: "Что-то пошло не так, попробуйте еще раз"
        }
    }
}

export {
    // getConfiguration,
    checkIsEmailExist,
    loginIntoAccount,
    registerAccount,
    resetPassword,
    approveEmail,
    confirmReset,
    logoutUser,
    loginWithGoogle,
    refreshToken,
}
