'use client'
import React, {FC, useMemo, useState, useRef} from 'react'
import PasswordField from "@/components/shared/Inputs/PasswordField";
import FormWrapper from "@/components/shared/FormWrapper";
// import {Image} from "@nextui-org/image";
import {ActionResponse} from "@/configs/http-service/fetch-settings/types";
import ImageBlock from '../ImageBlock';
import { getAvatarSize, isMinHeight1024MediaQuery, isMinHeight768MediaQuery } from '@/components/shared/helpers';
import { useMediaQuery } from 'react-responsive';

type Props = {
    handleResetPassword: ((fd: FormData) => Promise<ActionResponse>)
}

const NewPasswordForm: FC<Props> = ({handleResetPassword}) => {
    const [newPasswordValue, setNewPasswordValue] = useState("");
    const [repeatPasswordValue, setRepeatPasswordValue] = useState("");

    // const isMinHeight768 = useMediaQuery(isMinHeight768MediaQuery)
    const isMinHeight1024 = useMediaQuery(isMinHeight1024MediaQuery)

    const isInvalid = useMemo(() => {
        if (newPasswordValue === "" || repeatPasswordValue === "") {
            return false
        }

        return newPasswordValue !== repeatPasswordValue
    }, [newPasswordValue, repeatPasswordValue])

    const imgBlockChildrens = useRef(
        <h1 className={'w-full text-center text-2xl font-bold'}>
            Create new password
        </h1>
    )

    return (
        <>
            <div className={'grid place-items-start h-full'}>
                <FormWrapper action={handleResetPassword}
                             actionLabel={'Reset password'}>
                    <div className={'flex flex-col w-full gap-6 h-full'}>
                        <div className={'w-full flex flex-col gap-2 justify-center text-center items-center'}>
                            <ImageBlock
                                imageSrc={'/authImage.jpg'}
                                avatarSize={getAvatarSize(
                                    [
                                        {value: isMinHeight1024, size: "large"},
                                        // {value: isMinHeight768, size: "medium"},
                                    ],
                                    "medium"
                                )}
                            >
                                {imgBlockChildrens.current}
                            </ImageBlock>
                            {/* <Image src={'/authImage.jpg'} alt={'logo'} width={200} height={200}/>
                            <h1 className={'w-full text-center text-2xl font-bold'}>
                                Create new password
                            </h1> */}
                        </div>
                        <div className={'flex flex-col gap-2'}>
                            <PasswordField
                                size={'lg'}
                                value={newPasswordValue}
                                onValueChange={setNewPasswordValue}
                                name={'new_password'}
                                label={'New Password'}
                                placeholder={'Enter new password'}
                                minLength={8}
                                required
                            />
                            <PasswordField
                                size={'lg'}
                                value={repeatPasswordValue}
                                onValueChange={setRepeatPasswordValue}
                                isInvalid={isInvalid}
                                errorMessage={'Passwords do not match'}
                                name={'repeat_new_password'}
                                label={'Confirm New Password'}
                                placeholder={'Repeat new password'}
                                minLength={8}
                                required
                            />
                        </div>
                    </div>
                </FormWrapper>
            </div>



        </>
    )
}

export default NewPasswordForm