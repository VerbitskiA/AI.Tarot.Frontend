type FetchMethodT = 'get' | 'post' | 'put' | 'patch' | 'delete'
export type FetchQueryParamsT = {
    [key: string]: string | number
}
export type FetchOptionsT = {
    params?: FetchQueryParamsT,
    source?: 'server' | 'client'
} & Omit<RequestInit, 'method'>

type SuccessFetchResponse<ReturnType = unknown> = {
    status: number,
    headers: Headers,
    ok: true,
    data: ReturnType
}
type ErrorFetchResponse = {
    status: number,
    headers: Headers,
    ok: false,
    data: {detail: string}
}
type FetchResponseT<ReturnType = any> = SuccessFetchResponse<ReturnType> | ErrorFetchResponse

type SuccessActionResponse = {
    status: 'ok',
    message?: string
}
type RejectActionResponse = {
    status: 'error',
    message: string
}
export type ActionResponse = SuccessActionResponse | RejectActionResponse

export type PaginatedFetchResponse<Data> = {
    previous: string,
    next: string,
    count: number,
    results: Data[],
}

export type FetchServiceT= {
    [key in FetchMethodT]: <ReturnType = any>(
        url: string,
        options?: FetchOptionsT,
    ) => Promise<FetchResponseT<ReturnType>>
}
