'use client'
import PasswordField from '@/components/shared/Inputs/PasswordField'
import TextField from '@/components/shared/Inputs/TextField'
import React, {FC} from 'react'
import FormWrapper from "@/components/shared/FormWrapper";
import Link from "next/link";
import ImageBlock from "@/components/entities/Auth/ImageBlock";
import fetchService from "@/configs/http-service/fetch-settings";
import {useRouter} from "next/navigation";
import {TOKENS_KEYS} from "@/configs/http-service/constants/authTokens";
import {setCookie} from "cookies-next";
import {useConfiguration} from "@/components/providers/ConfigurationProvider";

type Props = {
    handleAuth: ((fd: FormData) => Promise<any>)
}


const UserLoginForm: FC<Props> = ({handleAuth}) => {
    const router = useRouter();
    const { fetchConfiguration } = useConfiguration();

    const handleLogin = async (fd: FormData) => {
        // 'use server'
        const res = await handleAuth(fd)

        if (res.status === 'ok') {
            try {
                const res = await fetchService.post('api/account/login/', {
                    body: JSON.stringify({
                        email: fd.get('email'),
                        password: fd.get('password')
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    source: 'client',
                    credentials: 'include',
                })

                if(res.ok) {
                    await fetchConfiguration();
                    router.push('/?startScreen=true')
                }
                console.log(res)
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
        return res
    }

    return (
        <>
            <div className={'grid place-items-start h-full'}>
                <FormWrapper action={handleLogin}
                             infoUnderButton={
                                 <div className={'flex gap-1 text-center w-full items-center'}>
                                     <p className={'text-sm w-full text-[#BEBEBE] text-center'}>
                                         {'Don’t have an account? '}
                                         <Link href={'/auth/register'}
                                               className={'text-sm font-extrabold text-center text-[#27ACC9] hover:underline'}>
                                             Sign up
                                         </Link>
                                     </p>
                                 </div>
                             }
                             actionLabel={'Log in'}>
                    <input hidden value={'login'} name={'auth'}/>
                    <div className={'flex flex-col w-full gap-3 h-full '}>
                        <ImageBlock imageSrc={'/authImage.png'}>
                            <h1 className={'w-full text-center text-2xl sm:text-3xl font-bold'}>
                                Nice to meet you 👋
                            </h1>
                        </ImageBlock>
                        <div className={'flex flex-col gap-2'}>
                            <TextField
                                size={'lg'}
                                label={'Email'}
                                className={'text-xl'}
                                placeholder={'Email address'}
                                name={'email'}
                                type={'email'}
                                required
                            />
                            <PasswordField
                                size={'lg'}
                                name={'password'}
                                label={'Password'}
                                placeholder={'Password'}
                                minLength={5}
                                required
                            />
                            <Link href={'/auth/reset-password'}
                                  className={'text-sm font-normal text-end text-gray-300 hover:underline'}>
                                Forgot password?
                            </Link>
                        </div>
                    </div>
                </FormWrapper>
            </div>
        </>
    )
}

export default UserLoginForm