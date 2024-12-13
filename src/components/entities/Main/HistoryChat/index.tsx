'use client'
import React, {useCallback, useEffect, useState} from 'react'
import {Spread} from "@/lib/types/spread.types";
import {useRouter} from "next/navigation";
import {Avatar, Button} from "@nextui-org/react";
import {useConfiguration} from "@/components/providers/ConfigurationProvider";
import {Image} from "@nextui-org/image";
import {Message} from "@/lib/types/message.types";
import MessageDisplay from "@/components/entities/message/MessageDisplay";



const NewChatForm = ({messages}: {messages: Message[]}) => {
    const router = useRouter();
    const { configuration } = useConfiguration()

    return (
        <>
            <div className={'grid place-items-start h-full'}>
                <div className={`flex flex-col min-h-[calc(100dvh-58px)] h-full justify-center gap-2 w-full`}>
                    <MessageDisplay messages={messages} isHistoryChat loading={false} userName={configuration?.currentUser.username}/>
                        <div className="flex-shrink-0 flex justify-center flex-col pb-3 gap-2 w-full ifems-center">
                            <p className={'text-medium font-normal text-center text-[#BEBEBE]'}>
                                This chat has ended, but you can still view its history! If you have a new question,
                                please start a new chat with me 😊
                        </p>
                        <div className={'flex w-full items-center justify-center'}>
                            <Image src={'/arrowToNewChat.svg'} height={16} width={16} radius={'none'}/>
                        </div>
                        <Button onClick={() => router.push('/chat/new')}
                                className={`flex items-center gap-2 sticky shadow-button bg-[#27ACC9] h-[60px] sm:h-[76px] font-semibold text-xl sm:text-2xl rounded-[60px]`}>
                            Get a Tarot reading
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewChatForm