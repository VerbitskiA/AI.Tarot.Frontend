'use client'
import TextField from '@/components/shared/Inputs/TextField'
import React, {FC, useEffect, useMemo, useState} from 'react'
import PasswordField from "@/components/shared/Inputs/PasswordField";
import {DatePicker, DateValue} from "@nextui-org/react";
import {Image} from "@nextui-org/image";
import FormWrapper from "@/components/shared/FormWrapper";
import Link from "next/link";
import {ActionResponse} from "@/configs/http-service/fetch-settings/types";
import {redirect, useRouter, useSearchParams} from "next/navigation";
import {I18nProvider} from "@react-aria/i18n";
import ImageBlock from "@/components/entities/Auth/ImageBlock";
import fetchService from "@/configs/http-service/fetch-settings";
import {setCookie} from "cookies-next";
import {registerAccount} from "@/lib/serverActions/auth";
import {useConfiguration} from "@/components/providers/ConfigurationProvider";

type Props = {
    handleCheckEmail: ((fd: FormData) => Promise<ActionResponse>),
    onboardQuestion: boolean,
}

const UserProfileForm: FC<Props> = ({handleCheckEmail, onboardQuestion}) => {
    const { fetchConfiguration } = useConfiguration()
    const [value, setValue] = useState("");
    const [emailValue, setEmailValue] = useState("");
    const [emailExists, setEmailExists] = useState(false);
    const [selectedGender, setSelectedGender] = useState("female");
    const [dateOfBirth, setDateOfBirth] = useState<DateValue | null | undefined>(null);
    const [dateOfBirthExists, setDateOfBirthExists] = useState(false);
    const router = useRouter()
    const searchParams = useSearchParams();
    const addInfo = !!searchParams?.get('addInfo')
    const question = searchParams?.get('onboardQuestion') ?? ''

    useEffect(() => {
        setEmailExists(false)
    }, [emailValue]);

    const handleGenderChange = (gender: string) => {
        setSelectedGender(gender);
    };
    const isInvalid = useMemo(() => {
        if (value === "") {
            return false
        }

        return value.length < 8
    }, [value])

    const handleRegister = async (fd: FormData) => {
        const res = await registerAccount(fd)
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
                    onboardQuestion ?
                        router.push(`/auth/approve-email?onboardQuestion=${onboardQuestion}&email=${emailValue}`)
                        :
                        router.push(`/auth/approve-email?email=${emailValue}`)
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
            {/*<div className={'flex flex-col justify-center gap-4 h-full'}>*/}
            {/*    */}
                <div className={'grid place-items-start h-full'}>
                    <FormWrapper action={addInfo ? handleRegister : handleCheckEmail}
                                 infoUnderButton={!addInfo &&
                                     <div className={'flex gap-1 text-center w-full items-center'}>
                                         <p className={'text-xs w-full text-center text-[#BEBEBE]'}>
                                             {'By creating an account or signing you agree to our '}
                                             <Link href={'?register'}
                                                   className={'font-extrabold text-center underline'}>
                                                 Terms and Conditions
                                             </Link>
                                         </p>
                                     </div>
                                 }
                                 setInvalid={addInfo ? setDateOfBirthExists : setEmailExists}
                                 actionLabel={addInfo ? 'Complete & get tarot spread' : 'Create account'}
                    >
                        <input hidden name={'email'} value={emailValue}/>
                        <input hidden name={'password'} value={value}/>
                        <input hidden name={'gender'} value={selectedGender}/>
                        <div className={'flex flex-col w-full gap-3 h-full '}>
                            <ImageBlock imageSrc={'/registerImage.png'}>
                                <h1 className={'w-full text-center text-2xl sm:text-3xl font-bold'}>
                                    {addInfo ?
                                        'Please provide details for a more accurate tarot reading'
                                        :
                                        'Create account to save your chat with the AI taro reader'
                                    }
                                </h1>
                            </ImageBlock>
                            <div className={'flex flex-col'}>
                                {addInfo ?
                                    <>
                                        <TextField
                                            size={'lg'}
                                            required
                                            label={'Name'}
                                            className={'text-xl'}
                                            placeholder={'Georgii'}
                                            name={'username'}
                                            errorMessage={'lfkasjdklfjd'}
                                            // type={'email'}
                                        />
                                        {/*<DateInput*/}
                                        {/*    name={'dateOfBirth'}*/}
                                        {/*    isRequired={true}*/}
                                        {/*    labelPlacement={'outside'}*/}
                                        {/*    size={'lg'}*/}
                                        {/*    label="Date of birth"*/}
                                        {/*    variant={'faded'}*/}
                                        {/*    dateInputClassNames={{*/}
                                        {/*        inputWrapper: 'border-[1px] h-[60px] border-gray-700 focus:ring-indigo-500 focus:border-indigo-500',*/}
                                        {/*        label: 'text-[#ECEDEE] font-semibold text-sm group-data-[required=true]:after:hidden',*/}
                                        {/*        input: 'placeholder:text-[#E9E9E9]'*/}
                                        {/*    }}*/}
                                        {/*    showMonthAndYearPickers*/}
                                        {/*/>*/}
                                        <I18nProvider locale="en-GB">
                                            <DatePicker
                                                name={'dateOfBirth'}
                                                isRequired={true}
                                                labelPlacement={'outside'}
                                                size={'lg'}
                                                label="Date of birth"
                                                variant={'faded'}
                                                isInvalid={dateOfBirthExists}
                                                errorMessage={'Please fill out this field'}
                                                dateInputClassNames={{
                                                    base: [
                                                        'gap-y-0 pb-0'
                                                    ],
                                                    inputWrapper: [
                                                        'border-[1px] h-[60px] border-gray-700 focus:ring-indigo-500 focus:border-indigo-500',
                                                        'group-data-[invalid=true]:bg-default-100',
                                                        'group-data-[invalid=true]:hover:bg-default-100',
                                                        'group-data-[invalid=true]:focus-within:hover:bg-default-100'
                                                    ],
                                                    label: [
                                                        'text-[#ECEDEE] font-semibold text-sm group-data-[required=true]:after:hidden',
                                                        'group-data-[invalid=true]:text-[#E9E9E9] text-medium sm:text-lg'
                                                    ],
                                                    input: 'placeholder:text-[#E9E9E9]',
                                                    segment: 'data-[editable=true]:data-[placeholder=true]:text-white uppercase'
                                                }}
                                                showMonthAndYearPickers
                                                value={dateOfBirth}
                                                onChange={(newDate) => {
                                                    setDateOfBirthExists(false);
                                                    setDateOfBirth(newDate)
                                                }}
                                            />
                                        </I18nProvider>
                                        <div className="flex flex-col items-start text-medium sm:text-lg">
                                            <h2 className="mb-1 text-white font-semibold">Choose your
                                                gender</h2>
                                            <div className="flex gap-4">
                                                <button type={'button'}
                                                        onClick={() => handleGenderChange("female")}
                                                        className={`flex items-center justify-center w-[150px] h-[60px] text-white font-normal 
                                                                rounded-[48px] border-[1px] transition-all ${
                                                            selectedGender === "female"
                                                                ? "bg-[#27ACC9] border-[#27ACC9]"
                                                                : "bg-[#2A2A2A] border-[#424242]"
                                                        }`}
                                                >
                                                    <span className="flex items-center gap-2">
                                                        <Image src={'/female.svg'} height={32} width={20}/>
                                                        Female
                                                    </span>
                                                </button>

                                                <button type={'button'}
                                                        onClick={() => handleGenderChange("male")}
                                                        className={`flex items-center justify-center w-[150px] h-[60px] text-white font-normal 
                                                                rounded-[48px] border-[1px] transition-all ${
                                                            selectedGender === "male"
                                                                ? "bg-[#27ACC9] border-[#27ACC9]"
                                                                : "bg-[#2A2A2A] border-[#424242]"
                                                        }`}
                                                >
                                                    <span className="flex items-center gap-2">
                                                        <Image src={'/male.svg'} radius={'none'} width={28}
                                                               height={28}/>
                                                        Male
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <TextField
                                            size={'lg'}
                                            value={emailValue}
                                            onValueChange={setEmailValue}
                                            required
                                            isInvalid={emailExists}
                                            errorMessage={'Email already exists'}
                                            label={'Email'}
                                            className={'text-xl'}
                                            placeholder={'Email address'}
                                            // name={'email'}
                                            type={'email'}
                                        />
                                        <PasswordField
                                            value={value}
                                            required
                                            onValueChange={setValue}
                                            isInvalid={isInvalid}
                                            errorMessage={"The password must contain at least 8 characters"}
                                            size={'lg'}
                                            // name={'password'}
                                            label={'Password'}
                                            placeholder={'Password'}
                                            minLength={8}
                                        />
                                    </>
                                }
                            </div>
                            <div className={'flex flex-col w-full gap-2'}>
                                {/*<SubmitButton label={}/>*/}

                                <div className={'flex gap-1 px-1 text-center w-full items-center'}>
                                    {addInfo ??
                                        <p className={'text-xs w-full text-center text-[#BEBEBE]'}>
                                            {'By creating an account or signing you agree to our '}
                                            <Link href={'?register'}
                                                  className={'font-extrabold text-center underline'}>
                                                Terms and Conditions
                                            </Link>
                                        </p>
                                    }

                                </div>
                            </div>
                        </div>
                    </FormWrapper>
                </div>
            {/*</div>*/}
        </>
    )
}

export default UserProfileForm