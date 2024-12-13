'use client'
import TextField from '@/components/shared/Inputs/TextField'
import React, {FC} from 'react'
import FormWrapper from "@/components/shared/FormWrapper";
import {Image} from "@nextui-org/image";
import {ActionResponse} from "@/configs/http-service/fetch-settings/types";


type Props = {
    handleReset: ((fd: FormData) => Promise<ActionResponse>)
}

const ResetPasswordForm: FC<Props> = ({handleReset}) => {

    return (
        <>
            <div className={'grid place-items-start h-full'}>
                <FormWrapper action={handleReset}
                             infoUnderButton={
                                 <div className={'flex gap-1 text-center w-full items-center'}>
                                     <p className={'text-sm w-full text-[#BEBEBE] text-center'}>
                                         Please contact the help@aitarot.io if you forgot an email
                                     </p>
                                 </div>
                             }
                             actionLabel={'Send code'}>
                    <input hidden value={'login'} name={'auth'}/>
                    <div className={'flex flex-col w-full gap-6 h-full '}>
                        <div className={'w-full flex flex-col gap-2 justify-center text-center items-center'}>
                            <Image src={'/authImage.png'} alt={'logo'} width={200} height={200}/>
                            <h1 className={'text-2xl font-semibold'}>
                                Don’t worry, let’s get your account back 😉
                            </h1>
                            <p className={'px-4 text-medium font-normal'}>
                                Please enter the email associated with your account and i’ll send a code.
                            </p>
                        </div>
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
                        </div>
                    </div>
                </FormWrapper>
            </div>
        </>
    )
}

export default ResetPasswordForm