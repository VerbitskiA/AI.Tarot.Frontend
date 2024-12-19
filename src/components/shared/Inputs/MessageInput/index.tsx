'use client'
import {Button} from '@nextui-org/react'
import React, {FC} from 'react'
import {Input, InputProps} from "@nextui-org/input";
import {Image} from "@nextui-org/image";

type MessageInputProps = {

} & InputProps & { readonly label?: string }

const MessageInput: FC<MessageInputProps> = ({
                                           ...props
                                       }) => {
    const [touched, setTouched] = React.useState(false)

    return (
        <Input
            {...props}
            InputProps={{
                autocomplete: 'off'
            }}
            endContent={
                <Button
                    type={'submit'}
                    isIconOnly
                    // radius={'full'}
                    className={'bg-[#22879D] w-full rounded-full max-w-[44px] sm:max-w-[62px] h-[44px] sm:h-[62px] shadow-button'}
                >
                    <Image src={'/ic_send.svg'} radius={'none'} width={20} height={20}/>
                </Button>
            }
            autoComplete="off"
            variant={'faded'}
            radius={'lg'}
            labelPlacement={'outside'}
            classNames={{
                inputWrapper: 'border-[1px] h-[60px] sm:h-[78px] border-gray-700 focus:ring-indigo-500 focus:border-indigo-500',
                input: [
                    'h-full',
                    'placeholder:text-[#E9E9E9]',
                    'text-medium sm:text-lg',
                ],
                label: 'text-sm sm:text-xl font-semibold',
            }}/>
    )
}

export default MessageInput