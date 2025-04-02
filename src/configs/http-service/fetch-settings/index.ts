import BASE_URL from '@/configs/http-service/constants/baseUrl'
import {FetchOptionsT, FetchServiceT, FetchMethodT} from '@/configs/http-service/fetch-settings/types'
import { ErrorFetchResponse } from '@/configs/http-service/fetch-settings/types';
import { getServerSession } from 'next-auth';
import { getSession } from 'next-auth/react';
import { authOptions } from '@/lib/utils';
import { TokensData } from '@/lib/types/responsesData';

const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    'Accept': '/*/',
}

type ErrorData = {
	statusCode: number
	message: string
}

const returnErrorFetchData = async (response: Response): Promise<ErrorFetchResponse> => {
	let data: ErrorData | undefined

	try {
		data = await response.json()
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message)
		}
	}

    switch (response.status) {
        case 500:
            return {
                ok: false,
                headers: response.headers,
                status: response.status,
                data: {
                    detail: data?.message ? data.message : `Внутренняя ошибка сервиса (${response.status}), обратитесь в поддержку`,
                },
            }
        case 404:
            return {
                ok: false,
                headers: response.headers,
                status: response.status,
                data: {
                    detail: data?.message ? data.message : `Объект не существует или не найден (${response.status}), обратитесь в поддержку`,
                },
            }
        case 403:
            return {
                ok: false,
                headers: response.headers,
                status: response.status,
                data: {
                    detail: data?.message ? data.message : `Доступ запрещен (${response.status}), обратитесь к администратору`,
                },
            }
        case 401:
            return {
                ok: false,
                headers: response.headers,
                status: response.status,
                data: {
                    detail: data?.message ? data.message : `Доступ запрещен (${response.status}), пользователь не авторизован`,
                },
            }
        default:
            console.error('DEFAULT FETCH ERROR REDIRECT, data: ', data)
            return {
                ok: false,
                headers: response.headers,
                status: response.status,
                data: {
                    detail: data?.message ?? `Произошла ошибка при обработке запроса ${response.status}, обратитесь в поддержку`,
                },
            }
    }
}

const returnFetchData = async (response: Response) => {
    let data
    try {
        data = await response.json()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return {
            status: response.status,
            headers: response.headers,
            ok: true,
			// TODO: refactor
            // "no data" in case with res.ok and "no data expected"
            data: null,
        }
    }

    return {
        status: response.status,
        headers: response.headers,
        ok: true,
        data
    }
}

const resolveFetchResponse = async (response: Response | Error) => {
	if (response instanceof Error) {
		return {
			ok: false,
			data: {error: response}
		}
	}
	else if (response.ok) {
        return await returnFetchData(response)
    }

	return await returnErrorFetchData(response)
}

// TODO: get Auth header type from fetch
type AuthHeader = {Authorization: string}

const generateAuthHeader = (token: string): AuthHeader => {
    return {Authorization: `Bearer ${token}`}
}

const getHeaders = (
	isNeedAitaAuth: boolean = false,
	headers: HeadersInit | null = null,
	defaultHeaders: HeadersInit,
	accessToken?: string,
): HeadersInit => {
	if (isNeedAitaAuth) {
		return {
            ...(headers ? {...headers} : {...defaultHeaders}),
            ...(accessToken ? generateAuthHeader(accessToken) : null),
        }
	}
	else {
		return {
            ...(headers ? {...headers} : {...defaultHeaders}),
        }
	}
}

const retrieveFetchResponse = async (url: string, method: FetchMethodT, options?: FetchOptionsT): Promise<Response | Error> => {
    const params = new URLSearchParams(options?.params as unknown as string).toString() ?? ''

	const isNeedAitaAuth = options?.isNeedAitaAuth
	const isClientSource = options?.isClientSource

    let accessToken: string | undefined, refreshToken: string | undefined

	if (isNeedAitaAuth) {
		if (isClientSource) {
			const session = await getSession()

			accessToken = session?.user.tokens.accessToken
			refreshToken = session?.user.tokens.refreshToken
		}
		else {
			const session = await getServerSession(authOptions)

			accessToken = session?.user.tokens.accessToken
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			refreshToken = session?.user.tokens.refreshToken
		}
	}

	const headers = getHeaders(isNeedAitaAuth, options?.headers, defaultHeaders, accessToken)

	const fetchUrl = `${BASE_URL}${url}${params ? '?' + params : ''}`

    try {
        const response = await fetch(fetchUrl, {
            method,
            ...options,
            headers,
        })

		if (isNeedAitaAuth && refreshToken && !response.ok && response.status === 401) {
			// refresh token and repeat req
			const refreshTokenRes = await fetch(`${BASE_URL}/api/auth/refresh-token`, {
				method: "POST",
				credentials: "include",
				body: JSON.stringify({refreshToken}),
				headers: getHeaders(isNeedAitaAuth, options?.headers, defaultHeaders, accessToken),
			})

			if (refreshTokenRes.ok) {
				const data = await refreshTokenRes.json() as unknown as TokensData
				console.log("refresh token data", data)
				// TODO: save new tokens from data
				const repeatReq = await fetch(fetchUrl, {
					method,
					...options,
					headers,
				})

				return repeatReq
			}
		}

        return response
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message)
            return error
        }

        const errorMessage = `Fetch error, url: ${url}`

        console.error(errorMessage)
        return new Error(errorMessage)
    }
}

const fetchFunction = (method: FetchMethodT) => {
    return async <T>(url: string, options?: FetchOptionsT) => {
        const response = await retrieveFetchResponse(url, method, options)

        return <T>resolveFetchResponse(response)
    }
}

/**
 * You don`t need to wrap service methods into tryCatch block
 */
const fetchService: FetchServiceT = {
    get: fetchFunction("get"),
    post: fetchFunction("post"),
    patch: fetchFunction("patch"),
    put: fetchFunction("put"),
    delete: fetchFunction("delete"),
}

export default fetchService
