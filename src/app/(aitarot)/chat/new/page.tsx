import React, {FC} from 'react'
import NewChatForm from "@/components/entities/Main/NewChatForm";


type Props = {
    searchParams: {
        email: string,
        onboardQuestion?: string,
        resetPassword: string,
    }
}

const Page: FC<Props> = async({searchParams}) => {

    return (
        <>
            <NewChatForm onboardQuestion={!!searchParams.onboardQuestion}/>
        </>
    )
}

export default Page;