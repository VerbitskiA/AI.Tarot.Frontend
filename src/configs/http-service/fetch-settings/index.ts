import BASE_URL from '@/configs/http-service/constants/baseUrl'
import {TOKENS_KEYS} from '@/configs/http-service/constants/authTokens'
import {FetchOptionsT, FetchServiceT} from '@/configs/http-service/fetch-settings/types'

const defaultHeaders: { [key: string]: string } = {
    'Content-Type': 'application/json',
    'Accept': '/*/',
}


const getAuthToken: (source: 'client' | 'server') => Promise<string | null> = async (source = 'server') => {
    switch (source) {
        case 'client':
            const {getCookie} = await import('cookies-next')
            return getCookie(TOKENS_KEYS.access)
                ?? getCookie(TOKENS_KEYS.access)
                ?? null
        case 'server':
            const {cookies} = await import('next/headers')
            return cookies().get(TOKENS_KEYS.access)?.value
                ?? cookies().get(TOKENS_KEYS.access)?.value
                ?? null
    }
}


const returnErrorFetchData = async (response: Response) => {
    // console.log(response)
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
        default:
            const data = await response.json()
            console.log('DEFAULT FETCH ERROR REDIRECT',data)
            return {
                ok: false,
                headers: response.headers,
                status: response.status,
                data: {
                    detail: data.detail ?? `Произошла ошибка при обработке запроса ${response.status}, обратитесь в поддержку`,
                },
            }
    }
}
const returnFetchData = async (response: Response) => {
    const data = await response?.json()
    // console.log(data)
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

const retrieveFetchResponse = async (url: string, method: string, options?: FetchOptionsT): Promise<Response> => {

    const params = new URLSearchParams(options?.params as unknown as string).toString()
        ?? ''

    const token = await getAuthToken(options?.source ?? 'server')
    // console.log('TOKEN')
    // console.log(token?.split(';')[0])

    return await fetch(`${BASE_URL}${url}${params ? '?' + params : ''}`, {
        method,
        ...options,
        headers: {
            ...(!options?.source && {'Cookie': `${token?.split(';')[0]}`}),
            ...(options?.headers ? {...options?.headers} : {...defaultHeaders}),
        },
    })
}

const fetchService: FetchServiceT = {
    get: async (url, options) => {
        const response = await retrieveFetchResponse(url, 'GET', options)
        return await resolveFetchResponse(response)
    },
    post: async (url, options) => {
        // console.log(url)
        const response = await retrieveFetchResponse(url, 'POST', options)
        return await resolveFetchResponse(response)
    },
    patch: async (url, options) => {
        const response = await retrieveFetchResponse(url, 'PATCH', options)
        return await resolveFetchResponse(response)
    },
    put: async (url, options) => {
        const response = await retrieveFetchResponse(url, 'PUT', options)
        return await resolveFetchResponse(response)
    },
    delete: async (url, options) => {
        const response = await retrieveFetchResponse(url, 'DELETE', options)
        return await resolveFetchResponse(response)
    },
}

export default fetchService