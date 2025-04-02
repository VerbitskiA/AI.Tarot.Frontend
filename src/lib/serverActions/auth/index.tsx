"use server"
import fetchService from "@/configs/http-service/fetch-settings"
import { ActionResponse } from "@/configs/http-service/fetch-settings/types"
// import { ConfigurationType } from "@/lib/types/config.types"
import { GoogleLoginData, LoginData } from "@/lib/types/responsesData"
import { TOKENS_KEYS } from "@/configs/http-service/constants/authTokens"
import { TokensData } from "@/lib/types/responsesData"

// import { headers } from "next/headers"


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

/** Function returns "true" when email is exist
 *
 * @param email
 * @returns
 */
const checkIsEmailExist = async (email: string) => {
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

	return res
}

const loginWithGoogle = async (googleToken: string) => {

	const res = await fetchService.post<GoogleLoginData>("/api/auth/google", {
		body: JSON.stringify({
			token: googleToken
		})
	})

	return res
}

const loginIntoAccount = async (
    username: string,
    password: string
) => {

	const res = await fetchService.post<LoginData>("/api/auth/login", {
		body: JSON.stringify({
			email: username,
			password
		}),
		credentials: "include"
	})

	return res
}

const registerAccount = async (
    username: string,
    email: string,
    password: string,
    dateOfBirth: string,
    gender: string
) => {
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
}

const logoutUser = async (tokens: TokensData) => {
	const res = await fetchService.post("/api/auth/revoke", {
		body: JSON.stringify({
			[TOKENS_KEYS.REFRESH_TOKEN]: tokens.refreshToken
		}),
		tokens: tokens,
	})

	return res
}

const refreshToken = async (tokens: TokensData) => {
	const res = await fetchService.post<TokensData>("/api/auth/revoke", {
		body: JSON.stringify({
			[TOKENS_KEYS.REFRESH_TOKEN]: tokens.refreshToken
		}),
		tokens: tokens,
	})

	return res
}

const resetPassword = async (fd: FormData): Promise<ActionResponse> => {
	const response = await fetchService.post(
		"authentication/reset_password/",
		{
			body: JSON.stringify({
				email: fd.get("email")
			})
		}
	)

	if (response.ok) {
		return {
			status: "ok",
			message: "Письмо отправлено на вашу почту"
		}
	} else {
		return {
			status: "error",
			message: "Не удалось отправить письмо"
		}
	}
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const confirmReset = async (fd: FormData): Promise<ActionResponse> => {
    return {
        status: "ok",
        message: "Вы успешно сменили свой пароль"
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const approveEmail = async (fd: FormData): Promise<ActionResponse> => {
	const res = await fetchService.post(`/api/auth/confirm-email`, {
		body: JSON.stringify({
			code: "1111"
		})
	})

	if (res.ok) {
		return {
			status: "ok",
			message: "Вы успешно подтвердили вашу почту"
		}
	}
	else {
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
