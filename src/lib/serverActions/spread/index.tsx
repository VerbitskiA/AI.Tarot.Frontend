'use server'
import fetchService from '@/configs/http-service/fetch-settings'
import {ActionResponse} from '@/configs/http-service/fetch-settings/types'
import { ConfigurationType } from '@/lib/types/config.types';
import {TOKENS_KEYS} from "@/configs/http-service/constants/authTokens";
import {cookies} from "next/headers";
import {Spread} from "@/lib/types/spread.types";


const getAllSpreads = async(): Promise<Spread[]> => {
    const res = await fetchService.get(`api/spread/all/`)
    return res.data
}


export {
    getAllSpreads,
}