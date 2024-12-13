'use server'
import fetchService from '@/configs/http-service/fetch-settings'
import {ActionResponse} from '@/configs/http-service/fetch-settings/types'
import { ConfigurationType } from '@/lib/types/config.types';
import {TOKENS_KEYS} from "@/configs/http-service/constants/authTokens";
import {cookies} from "next/headers";



const getConfiguration = async(): Promise<ConfigurationType> => {
    const res = await fetchService.get(`api/configuration/`,
        {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
            },
            next: {
                tags: ['all']
            }
        })
    return res.data
}


const checkEmailExists = async(fd: FormData): Promise<ActionResponse> => {
    try {
        const res = await fetchService.get(`api/account/exists/${fd.get('email')}`)
        if(!!res.data) {
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
        message: ''
    }

}


const loginIntoAccount = async (fd: FormData): Promise<ActionResponse> => {
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
                httpOnly: true
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

const registerAccount = async (fd: FormData): Promise<ActionResponse> => {
    try {
        const res = await fetchService.post('api/account/register/', {
            body: JSON.stringify({
                username: fd.get('username'),
                email: fd.get('email'),
                password: fd.get('password'),
                dateOfBirth: fd.get('dateOfBirth'),
                gender: fd.get('gender'),
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
        if(e instanceof Error) {
            return {
                status: 'error',
                message: e.message
            }
        } else {
            return {
                status: 'error',
                message: 'Не удалось создать аккаунт'
            }
        }
    }
    return {
        status: 'ok',
        message: 'Htubcnhfwbz успешна'
    }
}

const successResponse = async (): Promise<ActionResponse> => {
    return {
        status: 'ok',
        message: ''
    }
}

const resetPassword = async (fd: FormData): Promise<ActionResponse> => {
    try {
        const response = await fetchService.post('authentication/reset_password/', {
            body: JSON.stringify({
                email: fd.get('email'),
            })
        })
        if(!response.ok) {
            const message = response.data.detail
            throw new Error(message)
        } else {
            return {
                status: 'ok',
                message: 'Письмо отправлено на вашу почту'
            }
        }

    } catch (e) {
        if(e instanceof Error) {
            return {
                status: 'error',
                message: e.message
            }
        } else {
            return {
                status: 'error',
                message: 'Не удалось отправить письмо'
            }
        }
    }
}

const confirmReset = async (fd: FormData): Promise<ActionResponse> => {
    return {
        status: 'ok',
        message: 'Вы успешно сменили свой пароль'
    }
}

const approveEmail = async (fd: FormData): Promise<ActionResponse> => {
    try {
        const res = await fetchService.put(`api/account/confirm-email?confirmationCode=${fd.get('code')}`)
        if(!res.ok) {
            const message = res.data.detail
            throw new Error(message)
        } else {
            return {
                status: 'ok',
                message: 'Вы успешно подтвердили вашу почту'
            }
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
}

export {
    getConfiguration,
    checkEmailExists,
    loginIntoAccount,
    registerAccount,
    resetPassword,
    approveEmail,
    successResponse,
    confirmReset
}