import React, {FC} from 'react'
import {redirect} from "next/navigation";
import {confirmReset} from "@/lib/serverActions/auth";
import ResetPasswordForm from "@/components/entities/Auth/ResetPasswordForm";



type Props = {
    searchParams: {
        code: string,
        email: string,
    }
}

const Page: FC<Props> = async({searchParams}) => {

    const handleReset = async (fd: FormData) => {
        'use server'
        const res = await confirmReset(fd)
        if (res.status === 'ok') {
            redirect(`/auth/approve-email?email=${fd.get('email')}&resetPassword=true`)
        }
        return res
    }

    return (
        <>
            <ResetPasswordForm
                handleReset={handleReset}
            />
        </>
    )
}

export default Page