type FetchMethodT = "get" | "post" | "put" | "patch" | "delete"
export type FetchQueryParamsT = {
    [key: string]: string | number
}
export type FetchOptionsT = {
    params?: FetchQueryParamsT
    source?: "server" | "client"
    tokens?: {
        accessToken: string
        refreshToken: string
    }
} & Omit<RequestInit, "method">

export type SuccessFetchResponse<ReturnType = unknown> = {
    status: number
    headers: Headers
    ok: true
    data: ReturnType
}
export type ErrorFetchResponse = {
    status: number
    headers: Headers
    ok: false
    data: { detail: string }
}
type FetchResponseT<ReturnType = unknown> =
    | SuccessFetchResponse<ReturnType>
    | ErrorFetchResponse

export type SuccessActionResponse = {
    status: "ok"
    message?: string
}
export type RejectActionResponse = {
    status: "error"
    message: string
}
export type ActionResponse = SuccessActionResponse | RejectActionResponse

export type PaginatedFetchResponse<Data> = {
    previous: string
    next: string
    count: number
    results: Data[]
}

export type FetchServiceT = {
    [key in FetchMethodT]: <ReturnType = unknown>(
        url: string,
        options?: FetchOptionsT
    ) => Promise<FetchResponseT<ReturnType>>
}
