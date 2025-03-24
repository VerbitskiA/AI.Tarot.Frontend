'use client'
import PasswordField from '@/components/shared/Inputs/PasswordField'
import TextField from '@/components/shared/Inputs/TextField'
import React, {FC} from 'react'
import FormWrapper from "@/components/shared/FormWrapper";
import Link from "next/link";
import ImageBlock from "@/components/entities/Auth/ImageBlock";
import fetchService from "@/configs/http-service/fetch-settings";
import {useRouter} from "next/navigation";
import {useConfiguration} from "@/components/providers/ConfigurationProvider";
import { getDefaultAvatarSizeNew, isMaxHeight1023MediaQuery, isMaxHeight767MediaQuery, isMaxHeight668MediaQuery } from '@/components/shared/helpers';
import { useMediaQuery } from 'react-responsive';
import GoogleBtn from '../GoogleBtn';

type Props = {
    handleAuth: ((fd: FormData) => Promise<any>)
}


const UserLoginForm: FC<Props> = ({handleAuth}) => {
    const router = useRouter();
    const { fetchConfiguration } = useConfiguration();
    
    const isMaxHeight668 = useMediaQuery(isMaxHeight668MediaQuery)
    const isMaxHeight767 = useMediaQuery(isMaxHeight767MediaQuery)
    const isMaxHeight1023 = useMediaQuery(isMaxHeight1023MediaQuery)

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
                    router.push('/')
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
        return res
    }

    return (
        <>
            <div className={'grid place-items-start h-full'}>
                <FormWrapper
                    action={handleLogin}
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
                    isAbsoluteHeader={true}
                    googleLoginButton={<GoogleBtn/>}
                    actionLabel={'Log in'}>
                        {/* TODO: check value -> defaultValue={'login'} */}
                    <input hidden defaultValue={'login'} name={'auth'}/>
                    <div className={'flex flex-col justify-end customMinH769:justify-center w-full gap-3 h-full '}>
                        <ImageBlock imageSrc={'/authImage.jpg'} avatarSize={getDefaultAvatarSizeNew(isMaxHeight767, isMaxHeight1023, isMaxHeight668)}>
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