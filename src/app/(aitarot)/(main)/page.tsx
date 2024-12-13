import React, {FC} from 'react'
import MainPageForm from "@/components/entities/Main/MainPageForm";
import {redirect} from "next/navigation";
import {Spread} from "@/lib/types/spread.types";
import fetchService from "@/configs/http-service/fetch-settings";
import {askOnboardQuestion} from "@/lib/serverActions/chat";

type Props = {
    searchParams: {
        chatId?: string
        startScreen?: string
    }
}

const Page: FC<Props> = async({searchParams}) => {

    const {ok, data} = await
        fetchService.get<Spread[]>('api/spread/all/', {
            next: {
                tags: ['spreads']
            }
        })
    if (!ok) {
        redirect('/auth/onboard')
    }

    const handleAskQuestion = async (fd: FormData) => {
        'use server'
        const res = await askOnboardQuestion(fd)
        if (res.status === 'ok') {
            redirect(`/auth/register?onboardQuestion=${fd.get('question')}`)
        }
        return res
    }
    return (
        <>
            <MainPageForm olderSpreads={data} searchParams={searchParams} handleAskQuestion={handleAskQuestion}/>
        </>
    )
}

export default Page