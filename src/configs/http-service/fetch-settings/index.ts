import BASE_URL from '@/configs/http-service/constants/baseUrl'
import {FetchOptionsT, FetchServiceT, FetchMethodT} from '@/configs/http-service/fetch-settings/types'
import { ErrorFetchResponse } from '@/configs/http-service/fetch-settings/types';

const defaultHeaders: { [key: string]: string } = {
    'Content-Type': 'application/json',
    'Accept': '/*/',
}

const returnErrorFetchData = async (response: Response): Promise<ErrorFetchResponse> => {
    switch (response.status) {
        case 500:
            return {
                ok: false,
                headers: response.headers,
                status: response.status,
                data: {
                    detail: 'Внутренняя ошибка сервиса (500), обратитесь в поддержку',
                },
            }
        case 404:
            return {
                ok: false,
                headers: response.headers,
                status: response.status,
                data: {
                    detail: 'Объект не существует или не найден (404), обратитесь в поддержку',
                },
            }
        case 403:
            return {
                ok: false,
                headers: response.headers,
                status: response.status,
                data: {
                    detail: 'Доступ запрещен (403), обратитесь к администратору',
                },
            }
        case 401:
            return {
                ok: false,
                headers: response.headers,
                status: response.status,
                data: {
                    detail: `Доступ запрещен (${response.status}), пользователь не авторизован`,
                },
            }
        default:
            const data = await response.json()
            console.error('DEFAULT FETCH ERROR REDIRECT',data)
            return {
                ok: false,
                headers: response?.headers,
                status: response?.status,
                data: {
                    detail: data?.detail ?? `Произошла ошибка при обработке запроса ${response?.status}, обратитесь в поддержку`,
                },
            }
    }
}

const returnFetchData = async (response: Response) => {
    let data
    try {
        data = await response.json()
    } catch (error) {
        return {
            status: response.status,
            headers: response.headers,
            ok: true,
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

const resolveFetchResponse = async (response: Response) => {
    if (response.ok) {
        return await returnFetchData(response)
    } else {
        return await returnErrorFetchData(response)
    }
}

// TODO: get Auth header type from fetch
type AuthHeader = {Authorization: string}

const generateAuthHeader = (token: string): AuthHeader => {
    return {Authorization: `Bearer ${token}`}
}

const retrieveFetchResponse = async (url: string, method: FetchMethodT, options?: FetchOptionsT): Promise<Response> => {
    const params = new URLSearchParams(options?.params as unknown as string).toString() ?? ''

    let accessToken, refreshToken

    if (options?.tokens) {
        const {accessToken: acess, refreshToken: refresh} = options.tokens

        accessToken = acess
        refreshToken = refresh
    }

    const getHeaders = (token?: string) => {
        return {
            ...(options?.headers ? {...options?.headers} : {...defaultHeaders}),
            ...(token ? generateAuthHeader(token) : null)
        }
    }

    // const refreshMyToken = async (refreshToken: string) => {
    //     const res = await fetch(`${BASE_URL}/api/auth/refresh-token`, {
    //         method: "POST",
    //         ...options,
    //         headers: getHeaders(refreshToken),
    //     })

    //     return res
    // }

    const response = await fetch(`${BASE_URL}${url}${params ? '?' + params : ''}`, {
        method,
        ...options,
        headers: getHeaders(accessToken),
    })

    // if (response.status === 401 && refreshToken) {
    //     console.log("refresh token")

    //     // repeat request
    //     response = await refreshMyToken(refreshToken)
    // }

    return response
}

const fetchFunction = (method: FetchMethodT) => {
    return async <T>(url: string, options?: FetchOptionsT) => {
        const response = await retrieveFetchResponse(url, method, options)
    
        return <T>resolveFetchResponse(response)
    }
}

const fetchService: FetchServiceT = {
    get: fetchFunction("get"),
    post: fetchFunction("post"),
    patch: fetchFunction("patch"),
    put: fetchFunction("put"),
    delete: fetchFunction("delete"),
}

export default fetchService