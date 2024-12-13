'use server'
import {checkEmailExists, registerAccount} from '@/lib/serverActions/auth'
import React, {FC, Suspense} from 'react'
import {redirect} from "next/navigation";
import UserProfileForm from "@/components/entities/Auth/UserRegisterForm";

type Props = {
    searchParams: {
        add_info?: string,
        onboardQuestion?: string,
    }
}

const Page: FC<Props> = async({searchParams}) => {
    const onboardQuestion = !!searchParams?.onboardQuestion
    const handleCheckEmail = async (fd: FormData) => {
        'use server'
        const res = await checkEmailExists(fd)
        if (res.status === 'ok') {
            onboardQuestion ?
                redirect(`/auth/register?addInfo=true&onboardQuestion=${onboardQuestion}`)
                :
                redirect(`/auth/register?addInfo=true`)
        }
        return res
    }

    return (
        <>
            <UserProfileForm
                onboardQuestion={onboardQuestion}
                handleCheckEmail={handleCheckEmail}
            />
        </>
    )
}

export default Page