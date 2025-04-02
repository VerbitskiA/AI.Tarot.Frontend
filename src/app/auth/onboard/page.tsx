import React, {FC} from 'react'
import OnBoardChatForm from "@/components/entities/Onboard/OnBoardChatForm";

type Props = {
    searchParams: {
        [key: string]: string
    }
}

const Page: FC<Props> = async() => {

    return (
        <>
            <OnBoardChatForm/>
        </>

    )
}

export default Page
