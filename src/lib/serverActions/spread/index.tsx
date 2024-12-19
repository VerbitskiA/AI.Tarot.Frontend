'use server'
import fetchService from '@/configs/http-service/fetch-settings'
import {Spread} from "@/lib/types/spread.types";


const getAllSpreads = async(): Promise<Spread[]> => {
    const res = await fetchService.get(`api/spread/all/`)
    return res.data
}


export {
    getAllSpreads,
}