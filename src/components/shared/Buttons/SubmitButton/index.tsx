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
                className={cn(`flex items-center gap-2 sticky shadow-button bg-[#27ACC9] h-[60px] sm:h-[76px] font-semibold text-xl sm:text-2xl rounded-[60px]`, props.className)}
                type={'submit'}
        >
            {pending && <ChevronCircleTopLinearIcon className={'animate-spin'}/>}
            {label}
        </Button>
    )
}

export default SubmitButton