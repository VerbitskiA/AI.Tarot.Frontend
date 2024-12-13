import React, {FC} from 'react'
import {redirect} from "next/navigation";
import OnBoardChatForm from "@/components/entities/Onboard/OnBoardChatForm";
import {askOnboardQuestion} from "@/lib/serverActions/chat";

type Props = {
    searchParams: {
        [key: string]: string
    }
}

const Page: FC<Props> = async({searchParams}) => {

    return (
        <>
            <OnBoardChatForm/>
        </>

    )
}

export default Page