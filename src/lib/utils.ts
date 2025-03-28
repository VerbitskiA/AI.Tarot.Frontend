import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { RejectActionResponse } from "@/configs/http-service/fetch-settings/types"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const defaultFetchErrorMessage = (queryName: string) => {
    return `Something went wrong with ${queryName}`
}

/**
 * Function for generating of catch block error
 * 
 * @param error 
 * @param queryName 
 * @returns 
 */
export const fetchError = (error: unknown, queryName: string) => {
    if (error instanceof Error) {
        return error
    }

    const errorMessage = defaultFetchErrorMessage(queryName)

    console.error(errorMessage)
    return new Error(errorMessage)
}

export const defaultFormServerActionError = (error: unknown, defaultErrorMessage: string): RejectActionResponse => {
    if (error instanceof Error) {
        return {
            status: "error",
            message: error.message
        }
    }
    
    return {
        status: "error",
        message: defaultErrorMessage
    }
}
