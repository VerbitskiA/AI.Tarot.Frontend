import { TokensData } from "@/lib/types/responsesData"

export type FetchMethodT = "get" | "post" | "put" | "patch" | "delete"
export type FetchQueryParamsT = {
    [key: string]: string | number
}
export type FetchOptionsT = {
    params?: FetchQueryParamsT
    // source?: "server" | "client"
	isClientSource?: boolean
	isNeedAitaAuth?: boolean
    tokens?: TokensData
} & Omit<RequestInit, "method">

export type SuccessFetchResponse<ReturnType> = {
    status: number
    headers: Headers
    ok: true
    data: ReturnType
}

// TODO: ErrorFetchResponse data type
export type ErrorFetchResponse = {
    status?: number
    headers?: Headers
    ok: false
    data: { detail: string } | unknown | {error: Error}
}

// export type FetchError = {
// 	ok: false
// 	error: Error
// }

// TODO: FetchError
type FetchResponseT<ReturnType> =
    | SuccessFetchResponse<ReturnType>
    | ErrorFetchResponse
	// | FetchError

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
    [key in FetchMethodT]: <ReturnType = null>(
        url: string,
        options?: FetchOptionsT
    ) => Promise<FetchResponseT<ReturnType>>
}
