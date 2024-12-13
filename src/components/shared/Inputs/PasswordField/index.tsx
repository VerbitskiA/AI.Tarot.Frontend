'use client'
import TextField from '@/components/shared/Inputs/TextField'
import {InputProps} from '@nextui-org/input'
import {EyeFilledIcon, EyeSlashFilledIcon} from '@nextui-org/shared-icons'
import React, {FC, useState} from 'react'


type TextFieldProps = {

} & InputProps & { readonly label: string }

const PasswordField: FC<TextFieldProps> = ({...props}) => {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <TextField
            {...props}
            endContent={
                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                    {isVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                </button>
            }
            type={isVisible ? "text" : "password"}
        />
    );
}

export default PasswordField