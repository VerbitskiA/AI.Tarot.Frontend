'use client'

import PasswordField from '@/components/shared/Inputs/PasswordField'
import TextField from '@/components/shared/Inputs/TextField'
import React, {FC, useRef} from 'react'
import FormWrapper from "@/components/shared/FormWrapper";
import Link from "next/link";
import ImageBlock from "@/components/entities/Auth/ImageBlock";
import {useRouter} from "next/navigation";
import {useConfiguration} from "@/components/providers/ConfigurationProvider";
import { getAvatarSize, isMinHeight768MediaQuery, isMinHeight1024MediaQuery, isMinHeight669MediaQuery } from '@/components/shared/helpers';
import { useMediaQuery } from 'react-responsive';
import GoogleBtn from '../GoogleBtn';
import { signIn } from 'next-auth/react';
import { ActionResponse } from '@/configs/http-service/fetch-settings/types';

const UserLoginForm: FC = () => {
    const router = useRouter();
    const { fetchConfiguration } = useConfiguration();

    const isMinHeight669 = useMediaQuery(isMinHeight669MediaQuery)
    const isMinHeight768 = useMediaQuery(isMinHeight768MediaQuery)
    const isMinHeight1024 = useMediaQuery(isMinHeight1024MediaQuery)

    const imageTextBlock = useRef(
        <h1 className={'w-full text-center text-2xl sm:text-3xl font-bold'}>
            Nice to meet you 👋
        </h1>)

    const handleLogin = async (fd: FormData): Promise<ActionResponse> => {
        const email = fd.get('email')
        const password = fd.get('password')

        const res = await signIn("credentials", {
            username: email,
            password,
            redirect: false,
        })

        if(res?.ok) {
            await fetchConfiguration();
            router.push('/')
        }

		return {
			status: "error",
			message: "Something went wrong"
		}
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
                    googleLoginButton={<GoogleBtn redirectPath={"/"}/>}
                    actionLabel={'Log in'}>
                        {/* TODO: check value -> defaultValue={'login'} */}
                    <input hidden defaultValue={'login'} name={'auth'}/>
                    <div className={'flex flex-col justify-end customMinH769:justify-center w-full gap-3 h-full '}>
                        <ImageBlock
                            imageSrc={'/authImage.jpg'}
                            avatarSize={getAvatarSize(
                                [
                                    {value: isMinHeight1024, size: "large"},
                                    {value: isMinHeight768, size: "medium"},
                                    {value: isMinHeight669, size: "small"},
                                ],
                                "ultraSmall"
                            )}>
                                {imageTextBlock.current}
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
