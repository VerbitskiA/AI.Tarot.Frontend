'use server'
import fetchService from '@/configs/http-service/fetch-settings'
import {ActionResponse} from '@/configs/http-service/fetch-settings/types'
import {ConfigurationType} from '@/lib/types/config.types';
// import {TOKENS_KEYS} from "@/configs/http-service/constants/authTokens";
// import {cookies} from "next/headers";
import { LoginData } from '@/lib/types/responsesData';



const getConfiguration = async (): Promise<ConfigurationType | {detail: string}> => {
	const res = await fetchService.get<ConfigurationType>(`/api/configuration`,
		{
			headers: {
				'Content-Type': 'application/json',
				'Accept': '*/*'
			}
		})
	return res.data
}

/**
 * checkEmailExists func is not a form action
 * 
 * @param email 
 * @returns 
 */
const checkEmailExists = async (email: string) => {
	try {
		const res = await fetchService.get<boolean>(`/api/auth/exists?email=${email}`)

			console.log("checkEmailExists res", res)

			if (res.ok) {
				if (res.data) {
					return {
						status: 'ok',
						message: ''
					}
				}

				throw new Error("Email already exists")
			}

			const message = res.data.detail
			throw new Error(message)
	} catch (e) {
		if (e instanceof Error) {
			return {
				status: 'error',
				message: e.message
			}
		}
		return {
			status: 'error',
			message: 'Что-то пошло не так, попробуйте еще раз'
		}
	}
}

const loginWithGoogle = async () => {

}

/**
 * loginIntoAccount func is not a form action
 * 
 * @param username 
 * @param password 
 * @returns 
 */
const loginIntoAccount = async (username: string, password: string) => {
	try {
		const res = await fetchService.post<LoginData>('/api/auth/login', {
			body: JSON.stringify({
				email: username,
				password,
			})
		})

		if (res.ok) {
			const data = res.data
			// TODO: save tokens

			return {
				status: 'ok',
				message: 'Аутентификация успешна',
			}
		} else {
			const message = res.data.detail
			throw new Error(message)
		}
	} catch (e) {
		if (e instanceof Error) {
			return {
				status: 'error',
				message: e.message
			}
		}
		return {
			status: 'error',
			message: 'Что-то пошло не так, попробуйте еще раз'
		}
	}
}

// const loginIntoAccount = async (fd: FormData): Promise<ActionResponse> => {
// 	try {
// 		const res = await fetchService.post('/api/auth/login', {
// 			body: JSON.stringify({
// 				email: fd.get('email'),
// 				password: fd.get('password')
// 			})
// 		})

// 		if (res.ok) {
// 			const cookieHeader = res.headers.get('Set-Cookie') || '';  // Provide a default empty string if null
// 			const cookie = cookieHeader?.split(';')
// 			const cookieValue = cookie[0].split('=')[1];
// 			const expiresStr = cookie[1].split('=')[1];
// 			const expires = new Date(expiresStr);
// 			cookies().set(TOKENS_KEYS.access, cookieValue, {
// 				priority: 'high',
// 				sameSite: 'lax',
// 				domain: '.aitarot.io',
// 				secure: true,
// 				expires: expires,
// 				httpOnly: true
// 			});
// 		} else {
// 			const message = res.data?.detail
// 			throw new Error(message)
// 		}
// 	} catch (e) {
// 		if (e instanceof Error) {
// 			return {
// 				status: 'error',
// 				message: e.message
// 			}
// 		}
// 		return {
// 			status: 'error',
// 			message: 'Что-то пошло не так, попробуйте еще раз'
// 		}
// 	}
// 	return {
// 		status: 'ok',
// 		message: 'Аутентификация успешна'
// 	}
// }

const registerAccount = async (
	username: string,
	email: string,
	password: string,
	dateOfBirth: string,
	gender: string,
) => {
	try {
		const res = await fetchService.post<LoginData>('/api/auth/register', {
			body: JSON.stringify({
				username,
				email,
				password,
				dateOfBirth,
				gender,
			})
		})

		if (res.ok) {
			console.log("registerAccount data", res.data)
			// TODO: save token
			return {
				status: 'ok'
			}
		} else {
			const message = res.data.detail
			throw new Error(message)
		}
		
	} catch (e) {
		if (e instanceof Error) {
			return {
				status: 'error',
				message: e.message
			}
		}
		return {
			status: 'error',
			message: 'Что-то пошло не так, попробуйте еще раз'
		}
	}
}

// const registerAccount = async (fd: FormData): Promise<ActionResponse> => {
// 	try {
// 		const res = await fetchService.post('/api/auth/register', {
// 			body: JSON.stringify({
// 				username: fd.get('username'),
// 				email: fd.get('email'),
// 				password: fd.get('password'),
// 				dateOfBirth: fd.get('dateOfBirth'),
// 				gender: fd.get('gender')
// 			})
// 		})
// 		if (res.ok) {
// 			const cookieHeader = res.headers.get('Set-Cookie') || '';  // Provide a default empty string if null
// 			const cookie = cookieHeader?.split(';')
// 			const cookieValue = cookie[0].split('=')[1];
// 			const expiresStr = cookie[1].split('=')[1];
// 			const expires = new Date(expiresStr);
// 			cookies().set(TOKENS_KEYS.access, cookieValue, {
// 				priority: 'high',
// 				sameSite: 'lax',
// 				domain: '.aitarot.io',
// 				secure: true,
// 				expires: expires,
// 				httpOnly: true
// 			});
// 			console.info('Login successful, tokens have been installed')
// 		} else {
// 			const message = res.data?.detail
// 			throw new Error(message)
// 		}
// 	} catch (e) {
// 		if (e instanceof Error) {
// 			return {
// 				status: 'error',
// 				message: e.message
// 			}
// 		} else {
// 			return {
// 				status: 'error',
// 				message: 'Не удалось создать аккаунт'
// 			}
// 		}
// 	}
// 	return {
// 		status: 'ok',
// 		message: 'Htubcnhfwbz успешна'
// 	}
// }

const successResponse = async (): Promise<ActionResponse> => {
	return {
		status: 'ok',
		message: ''
	}
}

const resetPassword = async (fd: FormData): Promise<ActionResponse> => {
	try {
		const response = await fetchService.post('authentication/reset_password/', {
			body: JSON.stringify({
				email: fd.get('email')
			})
		})
		if (!response.ok) {
			const message = response.data.detail
			throw new Error(message)
		} else {
			return {
				status: 'ok',
				message: 'Письмо отправлено на вашу почту'
			}
		}

	} catch (e) {
		if (e instanceof Error) {
			return {
				status: 'error',
				message: e.message
			}
		} else {
			return {
				status: 'error',
				message: 'Не удалось отправить письмо'
			}
		}
	}
}

const confirmReset = async (fd: FormData): Promise<ActionResponse> => {
	return {
		status: 'ok',
		message: 'Вы успешно сменили свой пароль'
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
				status: 'ok',
				message: 'Вы успешно подтвердили вашу почту'
			}
		}
	} catch (e) {
		if (e instanceof Error) {
			return {
				status: 'error',
				message: e.message
			}
		}
		return {
			status: 'error',
			message: 'Что-то пошло не так, попробуйте еще раз'
		}
	}
}

export {
	getConfiguration,
	checkEmailExists,
	loginIntoAccount,
	registerAccount,
	resetPassword,
	approveEmail,
	successResponse,
	confirmReset
}