'use server'

import {checkIsEmailExist} from '@/lib/serverActions/auth'
import React, {FC} from 'react'
import {redirect} from "next/navigation";
import UserProfileForm from "@/components/entities/Auth/UserRegisterForm";
import { ActionResponse } from '@/configs/http-service/fetch-settings/types';

type Props = {
    searchParams: {
        add_info?: string,
        onboardQuestion?: string,
    }
}

const Page: FC<Props> = async({searchParams}) => {
    const onboardQuestion = !!searchParams?.onboardQuestion
    const handleCheckEmail = async (fd: FormData): Promise<ActionResponse> => {
        'use server'
        const email = fd.get("email")

        if (email && typeof email === "string") {
            try {
                const res = await checkIsEmailExist(email)

                console.log("checkIsEmailExist", res)

                if (res) {
                    onboardQuestion ?
                        redirect(`/auth/register?addInfo=true&onboardQuestion=${onboardQuestion}`)
                        :
                        redirect(`/auth/register?addInfo=true`)
                    
                    return {
                        status: "ok",
                    }
                }

                return {
                    status: "error",
                    message: "Email is exist"
                }
                
            } catch (error: unknown) {
                if (error instanceof Error) {
                    return {
                        status: "error",
                        message: error.message
                    }
                }
                return {
                    status: "error",
                    message: "Something went wrong with handleCheckEmail"
                }
            }
        }
        return {
            status: "error",
            message: "Not valid email"
        }
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