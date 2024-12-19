'use client'
import ImageBlock from "@/components/entities/Auth/ImageBlock";
import {Spread} from "@/lib/types/spread.types";
import SpreadCard from "@/components/entities/Main/SpreadCard";
import Link from "next/link";
import {Image} from "@nextui-org/image";
import {Button} from "@nextui-org/react";
import {AlignJustify} from "lucide-react";
import SideBar from "@/components/widgets/SideBar";
import React, {FC, useCallback, useEffect, useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import {useConfiguration} from "@/components/providers/ConfigurationProvider";
import fetchAnswer from "@/lib/clientActions/chat/fetch-answer";
import MessagesDisplay from "@/components/entities/message/MessageDisplay";
import QuestionInput from "@/components/shared/Inputs/QuestionInput";
import fetchService from "@/configs/http-service/fetch-settings";
import WelcomeMessage from "@/components/entities/Main/WelcomeMessage";

interface Props {
    olderSpreads: Spread[]
    searchParams: {
        chatId?: string
        startScreen?: string
    }
}

interface Message {
    message: string
    isUser: boolean
    images?: string[]
}

const DesktopMainPage: FC<Props> = ({olderSpreads, searchParams}) => {
    const [oldSpreads, setOldSpreads] = useState(olderSpreads);
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [isStartScreen, setIsStartScreen] = useState(!!searchParams?.startScreen);
    const showSidebar = () => setSidebarVisible(true);
    const router = useRouter();
    const pathname = usePathname();
    const [spreadCompleted, setSpreadCompleted] = useState(!!searchParams.chatId);
    const { fetchConfiguration, configuration } = useConfiguration();
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);
    const [aitaIsTyping, setAitaIsTyping] = useState(false);
    const [questionInputValue, setQuestionInputValue] = useState('');

    const handleAskQuestion = useCallback(async (question: string) => {
        setMessages([{ message: question, isUser: true }]);
        setQuestionInputValue('');
        setIsStartScreen(false);
        router.replace(pathname)
        await fetchAnswer(question, setMessages, setSpreadCompleted, fetchConfiguration, setLoading, setAitaIsTyping, router);
    }, [fetchConfiguration, router]);

    useEffect(() => {
        const getOlderSpread = async () => {
            const res = await fetchService.get<Spread>(`api/spread/view/${searchParams.chatId}/`, {
                credentials: 'include',
                source: 'client',
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            if (res.ok) {
                setMessages([
                    { message: res.data.question, isUser: true },
                    { message: res.data.answer, isUser: false, images: res.data.images }
                ]);
            }
        }

        if(searchParams.chatId) {
            getOlderSpread();
        }
    }, [searchParams.chatId]);

    useEffect(() => {
        const getSpreads = async () => {
            const res = await fetchService.get<Spread[]>('api/spread/all/', {
                credentials: 'include',
                source: 'client',
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            if (res.ok) {
                setOldSpreads(res.data);
            } else {
                console.error('Error fetching spreads:', res.data);
            }

        }

        getSpreads();
    }, [spreadCompleted]);

    const getNewTarotReading = () => {
        setMessages([])
        setLoading(false)
        setSpreadCompleted(false)
        router.push('/');
    }

    // useEffect(() => {
    //     console.log('onboardQuestion:', onboardQuestion); // Логируем onboardQuestion
    //     if (onboardQuestion && !messages.some(msg => msg.message === onboardQuestion)) {
    //         handleAskQuestion(onboardQuestion);
    //     }
    // }, [onboardQuestion]);

    return (
        <>
            <div className={'justify-between items-center h-full w-full lg:flex hidden'}>
                <div className={"relative flex gap-4 bg-gradient-main-chat h-full min-h-[calc(100dvh)] " +
                    "before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-[rgba(14,23,36,0.85)] " +
                    "bg-center bg-cover items-center justify-start"}>
                    <div className={'grid place-items-start h-full'}>
                        <div
                            className={`flex flex-col px-2 h-full  min-w-[450px] justify-center gap-2 w-full`}>
                            <div
                                className={`flex-grow overflow-y-auto`}>
                                <div
                                    className={'flex flex-col w-full justify-start items-center gap-4 min-h-[calc(100dvh-58px)] h-full'}>
                                    <ImageBlock imageSrc={'/onboard.png'} isMainPage>
                                        <h1 className={'z-10 w-full text-center text-2xl sm:text-lg font-bold'}>
                                            Nice to meet you 👋
                                        </h1>

                                    </ImageBlock>
                                    <div
                                        className={'z-10 flex flex-col gap-2 w-full max-w-[362px] px-4 items-center justify-center'}>
                                        {!!olderSpreads.length ?
                                            <p className={'font-normal text-2xl w-full pb-2 items-start justify-start'}>Chat
                                                History</p>
                                            :
                                            <p className={'font-normal text-center text-[#858585] text-lg w-full pb-2 items-start justify-start'}>
                                                Chat history will be here
                                            </p>
                                        }

                                        {
                                            oldSpreads.map((spread: Spread) => (
                                                <SpreadCard spread={spread} redirectType={'params'}/>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                            {/*<div*/}
                            {/*    className="flex-shrink-0 flex justify-center  flex-col pb-3 gap-2 w-full ifems-center">*/}
                            {/*    <Button onClick={() => router.push('/chat/new')}*/}
                            {/*            className={`flex items-center gap-2 sticky shadow-button bg-[#27ACC9] h-[60px] sm:h-[76px] font-semibold text-xl sm:text-2xl rounded-[60px]`}>*/}
                            {/*        Get a Tarot reading*/}
                            {/*    </Button>*/}
                            {/*    /!*<SubmitButton label={'Get a Tarot reading'}/>*!/*/}
                            {/*</div>*/}
                        </div>
                    </div>

                    <div className="grid place-items-start h-full">
                        <div
                            className="flex flex-col min-h-[calc(100dvh-58px)] w-[580px] justify-between gap-2">
                            <div className={`flex h-full justify-center gap-2 w-full`}>
                                {/*<div*/}
                                {/*    className={`flex-grow overflow-y-auto`}>*/}
                                <div className={'flex flex-col w-full items-center gap-4 h-full pr-4'}>
                                    <div className={'z-10 gap-2 flex justify-between w-full pt-1'}>
                                        {/*<p className={'text-xl sm:text-3xl font-semibold'}>Aita, ai tarologist</p>*/}
                                        <div
                                            className={'w-full flex gap-1 items-center justify-start text-xl sm:text-2xl font-semibold'}>
                                            Chat with Aita
                                            <div className={'bg-[#14B411] rounded-full w-2 h-2'}></div>
                                        </div>
                                        <div className='w-full flex gap-3 items-center justify-end'>
                                            <Link href={'/buy/oracles'}
                                                  className={'text-lg font-semibold w-fit text-[#27ACC9] hover:text-[#32CBED] transition-colors text-center'}>
                                                Add Oracles
                                            </Link>
                                            <div onClick={() => {router.push('/buy/oracles')}}
                                                className={'text-sm sm:text-lg flex items-center gap-1 bg-[#2A2A2A] hover:bg-[#3b3b39] transition-colors cursor-pointer rounded-3xl px-3 py-1.5'}>
                                                <p className={'flex items-end justify-end'}>{configuration?.currentUser.balance}</p>
                                                <Image src={'/oracle-icon.svg'} height={22} width={24}/>
                                            </div>
                                        </div>
                                    </div>
                                    {/*</div>*/}

                                </div>
                            </div>
                            {isStartScreen && !!searchParams?.startScreen ?
                                <WelcomeMessage isDesktop={true}/>
                                :
                                <MessagesDisplay messages={messages} isDesktop isHistoryChat={!!searchParams.chatId || spreadCompleted}
                                                 userName={configuration?.currentUser.username}
                                                 loading={aitaIsTyping}/>
                            }

                            {!!searchParams.chatId || spreadCompleted ?
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
                                    <Button onClick={() => getNewTarotReading()}
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


                </div>
                <div
                    className={"flex relative justify-center items-center bg-gradient-main-left bg-no-repeat bg-cover bg-top min-h-[calc(100dvh)] h-full w-full"}>
                    <div className={'absolute right-7 top-8'}>
                        <Button isIconOnly
                                className={'flex items-center justify-center bg-[rgba(69,69,69,0.5)] backdrop-blur-3xl rounded-full h-10 w-10'}
                                onClick={showSidebar}>
                            <AlignJustify strokeWidth={1.5} className="text-white h-5 w-7"/>
                        </Button>
                    </div>


                </div>
                <SideBar
                    open={sidebarVisible}
                    setOpen={setSidebarVisible}
                />
            </div>
        </>
    )
}

export default DesktopMainPage