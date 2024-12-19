'use client'
import React, {useEffect, useState} from 'react'
import {useConfiguration} from "@/components/providers/ConfigurationProvider";
import {useRouter} from "next/navigation";
import MessagesDisplay from "@/components/entities/message/MessageDisplay";
import QuestionInput from "@/components/shared/Inputs/QuestionInput";
import fetchAnswer from "@/lib/clientActions/chat/fetch-answer";
import {useMediaQuery} from "react-responsive";
import {Image} from "@nextui-org/image";
import {Button} from "@nextui-org/react";

interface Message {
    message: string
    isUser: boolean
    images?: string[]
}

const NewChatForm = ({onboardQuestion}: {onboardQuestion: boolean}) => {
    const router = useRouter();
    const { fetchConfiguration, configuration } = useConfiguration();
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);
    const [aitaIsTyping, setAitaIsTyping] = useState(false);
    const [questionInputValue, setQuestionInputValue] = useState('');
    const isDesktop = useMediaQuery({ minWidth: 1024 });
    const [spreadCompleted, setSpreadCompleted] = useState(false);

    const handleAskQuestion = async (question: string) => {
        // console.log('Asking question:', question); // Логируем вопрос
        setMessages([{ message: question, isUser: true }]);
        setQuestionInputValue('');
        await fetchAnswer(question, setMessages, setSpreadCompleted, fetchConfiguration, setLoading, setAitaIsTyping, router);
    }

    useEffect(() => {
        const getOnboardQuestion = async () => {
            const question = localStorage.getItem('onboardQuestion') as string;
            await handleAskQuestion(question);
            localStorage.removeItem('onboardQuestion');
        }
        if (isDesktop) {
            router.push('/')
        } else if (onboardQuestion) {
            getOnboardQuestion()
        }
    }, []);


    return (
        <>
            <div className="grid place-items-start h-full">
                <div className="flex flex-col min-h-[calc(100dvh-158px)] h-full justify-center gap-2 w-full">
                    <MessagesDisplay messages={messages} userName={configuration?.currentUser.username}
                                     loading={aitaIsTyping}/>
                    {spreadCompleted ?
                        <div
                            className="flex-shrink-0 z-10 flex justify-center flex-col pb-3 gap-2 ifems-center">
                            <p className={'text-2xl font-normal text-center text-[#BEBEBE]'}>
                                This chat has ended, but you can still view its history! If you have a new
                                question,
                                please start a new chat with me 😊
                            </p>
                            <div className={'flex w-full items-center justify-center'}>
                                <Image src={'/arrowToNewChat.svg'} height={16} width={16} radius={'none'}/>
                            </div>
                            <Button onClick={() => router.push('/chat/new')}
                                    className={`flex items-center mx-7 gap-2 sticky shadow-button bg-[#27ACC9] data-[hover=true]:bg-[#32cbed] transition-colors h-[60px] sm:h-[76px] font-semibold text-xl sm:text-2xl rounded-[60px]`}>
                                Get a Tarot reading
                            </Button>
                        </div>
                        :
                        <QuestionInput
                            questionInputValue={questionInputValue}
                            setQuestionInputValue={setQuestionInputValue}
                            handleAskQuestion={handleAskQuestion}
                            loading={loading}
                        />
                    }

                </div>
            </div>
        </>
    )
}

export default NewChatForm