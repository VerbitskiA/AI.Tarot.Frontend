'use client'
import {cn} from '@nextui-org/react'
import React, {FC} from 'react'
import {Input, InputProps} from "@nextui-org/input";

type TextFieldProps = {

} & InputProps & { readonly label?: string }

const TextField: FC<TextFieldProps> = ({
                                            ...props
                                       }) => {
    const [touched, setTouched] = React.useState(false)

    return (
        <Input
            {...props}
            InputProps={{
                autocomplete: 'off'
            }}
            autoComplete="off"
            variant={'faded'}
            labelPlacement={'outside'}
            onBlur={() => setTouched(true)}
            // size={'sm'}
            // color={(props.isRequired && touched && !props.value && !props.defaultValue) ? 'danger' : 'default'}
            pattern={props.inputMode === 'numeric' ? '^\\d+(\\.\\d+)*$' : undefined}
            className={cn('', props.className)} classNames={{
                inputWrapper: 'border-[1px] h-[60px] border-gray-700 focus:ring-indigo-500 focus:border-indigo-500',
                input: [
                    'h-full',
                    'placeholder:text-[#E9E9E9]',
                    'text-medium sm:text-lg',
                ],
                label: 'text-sm sm:text-xl font-semibold',
        }}
        />
    )
}

export default TextField