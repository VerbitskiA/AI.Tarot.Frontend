'use server'
import {ActionResponse} from "@/configs/http-service/fetch-settings/types";
import fetchService from "@/configs/http-service/fetch-settings";
import {Spread} from "@/lib/types/spread.types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const askOnboardQuestion = async (fd: FormData): Promise<ActionResponse> => {
    return {
        status: 'ok',
        message: ''
    }
}

const askQuestion = async (fd: FormData): Promise<{status: string, data: Spread}> => {
    const res = await fetchService.post('/api/spread/create', {
        body: JSON.stringify({
            question: fd.get('question')
        })
    })
    return {
        status: 'ok',
		// TODO: write generic
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
        data: res.data
    }
}


export {
    askOnboardQuestion,
    askQuestion
}
