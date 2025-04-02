'use server'
import fetchService from '@/configs/http-service/fetch-settings'
import {ConfigurationType} from "@/lib/types/config.types";


const getUserInfo = async(): Promise<ConfigurationType> => {
    const res = await fetchService.get<ConfigurationType>('/api/user', {
        next: {
            tags: ['user-profile'],
        }
    })
    return res.data as unknown as ConfigurationType
}


export {
    getUserInfo,
}
