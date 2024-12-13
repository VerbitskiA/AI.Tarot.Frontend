'use client'
import React, {FC, useRef, useState} from 'react'
import {Input} from "@nextui-org/input";
import FormWrapper from "@/components/shared/FormWrapper";
import {ActionResponse} from "@/configs/http-service/fetch-settings/types";
import Link from "next/link";
import ImageBlock from "@/components/entities/Auth/ImageBlock";

type Props = {
    resetPassword: boolean,
    email: string,
    handleVerify: ((fd: FormData) => Promise<ActionResponse>),
    handleCheck: ((fd: FormData) => Promise<ActionResponse>),
}


const VerifyEMailCodeForm: FC<Props> = ({resetPassword, email, handleCheck, handleVerify}) => {
    const [code, setCode] = useState('');
    const [isInvalid, setIsInvalid] = useState(false);
    const inputRefs = [
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
    ];

    // ts-ignore
    // @ts-ignore

    function handleInput(e: any, index: number) {
        const input = e.target;
        const previousInput = inputRefs[index - 1];
        const nextInput = inputRefs[index + 1];

        // Update code state with single digit
        // @ts-ignore
        const newCode = [...code];
        // Convert lowercase letters to uppercase
        if (/^[a-z]+$/.test(input.value)) {
            const uc = input.value.toUpperCase();
            newCode[index] = uc;
            // @ts-ignore
            inputRefs[index].current.value = uc;
        } else {
            newCode[index] = input.value;
        }
        setCode(newCode.join(''));
        setIsInvalid(false)
        input.select();

        if (input.value === '') {
            // If the value is deleted, select previous input, if exists
            if (previousInput) {
                // @ts-ignore
                previousInput.current.focus();
            }
        } else if (nextInput) {
            // Select next input on entry, if exists
            // @ts-ignore
            nextInput.current.select();
        }
    }

    // Select the contents on focus
    function handleFocus(e: any) {
        e.target.select();
    }

    // Handle backspace key
    function handleKeyDown(e: any, index: number) {
        const input = e.target;
        const previousInput = inputRefs[index - 1];
        const nextInput = inputRefs[index + 1];

        if ((e.keyCode === 8 || e.keyCode === 46) && input.value === '') {
            e.preventDefault();
            setCode((prevCode) => prevCode.slice(0, index) + prevCode.slice(index + 1));
            if (previousInput) {
                // @ts-ignore
                previousInput.current.focus();
            }
        }
    }

    // Capture pasted characters
    const handlePaste = (e: any) => {
        const pastedCode = e.clipboardData.getData('text');
        if (pastedCode.length === 4) {
            setCode(pastedCode);
            inputRefs.forEach((inputRef, index) => {
                // @ts-ignore
                inputRef.current.value = pastedCode.charAt(index);
            });
        }
    };


    return (
        <>
            <div className={'grid place-items-start h-full'}>
                <FormWrapper action={resetPassword ? handleCheck : handleVerify}
                             infoUnderButton={
                                 <div className={'flex gap-1 text-center w-full items-center'}>
                                     <p className={'text-sm w-full text-[#BEBEBE] text-center'}>
                                         {resetPassword ?
                                             <>
                                                 {'I didn’t receive a code '}
                                                 <Link href={'#'}
                                                       className={'text-sm font-extrabold text-center text-[#27ACC9] hover:underline'}>
                                                     Resend
                                                 </Link>
                                             </>
                                             :
                                             <Link href={'#'}
                                                   className={'text-medium font-bold w-full text-[#27ACC9] hover:underline text-center'}>
                                                 Send code again
                                             </Link>
                                         }

                                     </p>
                                 </div>
                             }
                             actionLabel={'Verify'}>
                    <input hidden name={'code'} value={code}/>
                    <div className={'flex flex-col w-full gap-6 h-full '}>
                        <ImageBlock imageSrc={'/authImage.png'}>
                            <h1 className={'w-full text-center text-2xl sm:text-3xl font-bold'}>
                                {resetPassword ?
                                    'Please check your email'
                                    :
                                    'Please verify your email'
                                }
                            </h1>
                            <p className={'px-4 text-sm font-normal'}>
                                I`ve sent a code to <span className={'font-bold'}>{email}</span>
                            </p>
                        </ImageBlock>

                        <div className={'flex flex-col gap-2'}>
                            <div className="w-full flex gap-3 justify-center items-center">
                                {[0, 1, 2, 3].map((index) => (
                                    <Input
                                        key={index}
                                        maxLength={1}
                                        onChange={(e) => handleInput(e, index)}
                                        ref={inputRefs[index]}
                                        autoFocus={index === 0}
                                        onFocus={handleFocus}
                                        type={'tel'}
                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                        onPaste={handlePaste}
                                        classNames={{
                                            base: 'h-[80px] sm:h-[100px] w-[80px] sm:w-[100px]',
                                            mainWrapper: 'h-[80px] sm:h-[100px] w-[80px] sm:w-[100px]',
                                            inputWrapper: `${isInvalid ? 'border-red-500' : 'border-gray-700'}
                                rounded-xl border-[1px] h-[80px] sm:h-[100px] w-[80px] sm:w-[100px]
                                focus:ring-indigo-500 focus:border-indigo-500`,
                                            input: [
                                                'text-4xl sm:text-6xl font-semibold text-center',
                                                'placeholder:text-[#E9E9E9]',
                                            ],
                                            label: 'text-sm font-semibold',
                                        }}
                                        // disabled={isLoading}
                                    />
                                ))}
                            </div>
                            {isInvalid &&
                                <p className={'text-center text-sm text-red-500'}>Wrong code, please try again</p>
                            }
                        </div>
                    </div>
                </FormWrapper>
            </div>

            {/*<FormWrapper setInvalid={setIsInvalid} action={resetPassword ? handleCheck : handleVerify} withOutDefaultButton actionLabel={'Create account'}>*/}
            {/*    <input hidden value={'register'} name={'auth'}/>*/}
            {/*    <div className={'flex flex-col w-full gap-2 h-full justify-between'}>*/}
            {/*        <div className={'flex flex-col gap-2'}>*/}
            {/*        /!*    *!/*/}


            {/*        </div>*/}
            {/*        <div className={'flex flex-col w-full gap-2'}>*/}
            {/*            <SubmitButton label={'Verify'}/>*/}

            {/*            <div className={'flex gap-1 px-1 text-center w-full items-center'}>*/}
            {/*                <p className={'text-medium font-bold w-full text-[#27ACC9] text-center'}>*/}
            {/*                    Send code again*/}
            {/*                </p>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</FormWrapper>*/}

        </>
    )
}

export default VerifyEMailCodeForm