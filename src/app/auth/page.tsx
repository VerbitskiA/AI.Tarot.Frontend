'use server'
import UserLoginForm from '../../components/entities/Auth/UserLoginForm'
import React from 'react'
import fetchService from "@/configs/http-service/fetch-settings";
import {cookies} from "next/headers";
import {TOKENS_KEYS} from "@/configs/http-service/constants/authTokens";


const Page = async() => {
    const handleAuth = async (fd: FormData) => {
        'use server'
        try {
            const res = await fetchService.post('api/account/login/', {
                body: JSON.stringify({
                    email: fd.get('email'),
                    password: fd.get('password')
                }),
            })

            if (res.ok) {
                const cookieValue = res.headers.get('Set-Cookie') || '';  // Provide a default empty string if null
                cookies().set(TOKENS_KEYS.access, cookieValue, {
                    priority: 'high',
                    sameSite: 'lax',
                });
                console.info('Login successful, tokens have been installed')
            } else {
                const message = res.data?.detail
                throw new Error(message)
            }
        } catch (e) {
            if (e instanceof Error) {
                return {
                    status: 'error',
                    message: e.message,
                }
            }
            return {
                status: 'error',
                message: 'Что-то пошло не так, попробуйте еще раз',
            }
        }
        return {
            status: 'ok',
            message: 'Аутентификация успешна'
        }

    }
    return (
        <>
            <UserLoginForm
                handleAuth={handleAuth}
            />
        </>

    )
}

export default Page