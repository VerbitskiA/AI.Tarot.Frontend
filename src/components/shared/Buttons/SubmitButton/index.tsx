'use client'
import {Button, cn} from '@nextui-org/react'
import {ChevronCircleTopLinearIcon} from '@nextui-org/shared-icons'
import React from 'react'
import {useFormStatus} from 'react-dom'

type SubmitBtn = {
    readonly label?: string | React.ReactNode,
    readonly destructive?: boolean,
    readonly small?: boolean
} & React.ComponentProps<'button'>

const SubmitButton: React.FC<SubmitBtn> = ({
    label = 'Сохранить',
    destructive = false,
    small = false,
    ...props
}) => {

    const {pending} = useFormStatus()

    return (
        <Button disabled={props.disabled || pending} size={'lg'} color={destructive ? 'danger' : 'primary'}
            className={cn(`flex items-center gap-2 sticky shadow-button bg-[#27ACC9] data-[hover=true]:bg-[#32cbed] h-[var(--main-submit-button-height)] customMinH769:h-[76px] font-semibold text-xl customMinH769:text-2xl rounded-full`, props.className)}
            type={'submit'}
        >
            {pending && <ChevronCircleTopLinearIcon className={'animate-spin'}/>}
            {label}
        </Button>
    )
}

export default SubmitButton