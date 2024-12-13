'use client'
import PasswordField from '@/components/shared/Inputs/PasswordField'
import React from 'react'

const ConfirmResetPasswordForm = () => {
    return (
        <>
            <>
                <PasswordField name={'password'} label={'Пароль'} minLength={5} isRequired/>
            </>
        </>
    )
}

export default ConfirmResetPasswordForm