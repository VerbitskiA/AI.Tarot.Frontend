import {loginIntoAccount} from '@/lib/serverActions/auth'
import React from 'react'
import {redirect} from "next/navigation";
import NewPasswordForm from "@/components/entities/Auth/NewPasswordForm";
import { RejectActionResponse } from '@/configs/http-service/fetch-settings/types';

const Page = async() => {
    const handleResetPassword = async (fd: FormData) => {
        'use server'
        const email = fd.get('email')
		const newPassword = fd.get('password')

        if (email
            && newPassword
            && typeof email === "string"
            && typeof newPassword === "string"
        ) {
            try {
                const res = await loginIntoAccount(email, newPassword)

                if (res?.ok) {
                    redirect('/')
                }
            } catch (error) {
				if (error instanceof Error) {
					return {
						status: "error",
						message: error.message
					} as RejectActionResponse
				}

                return {
                    status: "error",
                    message: "Something went wrong"
                } as RejectActionResponse
            }

        }

        return {
            status: "error",
            message: "Something went wrong"
        } as RejectActionResponse
    }
    return (
        <>
            <NewPasswordForm
                handleResetPassword={handleResetPassword}
            />
        </>
    )
}

export default Page
