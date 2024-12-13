import React, {FC} from 'react'
import fetchService from "@/configs/http-service/fetch-settings";
import {Spread} from "@/lib/types/spread.types";
import {redirect} from "next/navigation";
import HistoryChat from "@/components/entities/Main/HistoryChat";


type Props = {
    searchParams: {
        chatDate: string,
    },
    params: {
        id: string,
    }
}

const Page: FC<Props> = async({searchParams, params}) => {

    const {ok, data} = await
        fetchService.get<Spread>(`api/spread/view/${params.id}/`, {
            next: {
                tags: ['spread']
            }
        })
    console.log(data)
    if (!ok) {
        redirect('/auth/onboard')
    } else {
        return (
            <>
                <HistoryChat messages={[{message: data.question, isUser: true}, {message: data.answer, isUser: false}]}/>
            </>
        )
    }

}

export default Page