'use server'
import fetchService from '@/configs/http-service/fetch-settings'
import {ConfigurationType} from "@/lib/types/config.types";


const getUserInfo = async(): Promise<ConfigurationType> => {
    const res = await fetchService.get('user/', {
        next: {
            tags: ['user-profile'],
        }
    })
    return res.data
}


export {
    getUserInfo,
}