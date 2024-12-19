'use server'
import {ActionResponse} from "@/configs/http-service/fetch-settings/types";
import fetchService from "@/configs/http-service/fetch-settings";
import {Spread} from "@/lib/types/spread.types";

const askOnboardQuestion = async (fd: FormData): Promise<ActionResponse> => {
    return {
        status: 'ok',
        message: ''
    }
}

const askQuestion = async (fd: FormData): Promise<{status: string, data: Spread}> => {
    const res = await fetchService.post('api/spread/create/', {
        body: JSON.stringify({
            question: fd.get('question')
        })
    })
    return {
        status: 'ok',
        data: res.data
    }
}


export {
    askOnboardQuestion,
    askQuestion
}