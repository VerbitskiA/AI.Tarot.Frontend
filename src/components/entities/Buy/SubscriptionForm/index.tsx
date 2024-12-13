'use client'
import {Image} from "@nextui-org/image";
import {Button} from "@nextui-org/react";
import React from "react";
import fetchService from "@/configs/http-service/fetch-settings";
import {StripeSessionType} from "@/lib/types/stripe-session.types";
import {useRouter} from "next/navigation";


const SubscriptionForm = () => {
    const router = useRouter();

    const pay = async() => {
        const res = await fetchService.post<{sessionId: string}>('api/payments/create-session', {
            body: JSON.stringify({
                amount: 499,
                description: 'Buy Subscription',
            }),
            credentials: 'include',
            source: 'client',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if(res.ok) {
            const sessionId = res.data.sessionId
            const sessionRes = await fetchService.get<StripeSessionType>(`api/payments/session/${sessionId}`, {
                credentials: 'include',
                source: 'client',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if(sessionRes.ok) {
                router.push(sessionRes.data.url)
            }
        }
    }

    return (
        <div className="flex flex-col gap-6 min-h-[calc(100dvh-58px)] justify-end">
            <h2 className="text-3xl lg:text-[44px] text-center font-semibold ">Subscribe to unlock all Aita features</h2>
            <div className={'flex flex-col gap-6 lg:px-12 text-center items-center justify-between'}>
                <div className={'w-full px-12'}>
                    <div className={'border-3 border-[#27ACC9] rounded-lg p-1 shadow-sub-card'}>
                        <ul className="flex flex-col gap-1.5 pl-3 pr-6 py-4 rounded text-medium lg:text-2xl font-medium bg-[#27ACC9] bg-opacity-25 backdrop-blur-xl">
                            <li className="flex items-center gap-2">
                                <Image src={'/Box.svg'} height={16} width={16}/>
                                1000 Oracles
                            </li>
                            <li className="flex items-center gap-2">
                                <Image src={'/Box.svg'} height={16} width={16}/>
                                Voice messages from Aita
                            </li>
                            <li className="flex items-center gap-2">
                                <Image src={'/Box.svg'} height={16} width={16}/>
                                Exclusive content
                            </li>
                            <li className="flex items-center gap-2">
                                <Image src={'/Box.svg'} height={16} width={16}/>
                                New features
                            </li>
                        </ul>
                    </div>
                </div>

                <p className="text-sm lg:text-lg">100 Oracles = 1 Question</p>
                <div className={'flex w-full flex-col gap-6 pb-3 lg:pb-7 px-4'}>
                    <Button onClick={() => pay()}
                        className={`flex items-center gap-2 sticky shadow-button bg-[#27ACC9] h-[60px] sm:h-[76px] font-semibold text-xl sm:text-2xl rounded-[60px]`}>
                        Subscribe <span className={'font-normal'}>USD 4.99</span>
                    </Button>
                    <div className={'flex flex-col gap-2 text-[#9999A3] text-center font-normal text-xs'}>
                        <div className="flex justify-center  gap-5">
                            <a href="#" className="underline">Privacy</a>
                            <a href="#" className="underline">Contact Support</a>
                            <a href="#" className="underline">Terms</a>
                        </div>
                        <p>
                            © 2024 Aita by Aitarot.io. All rights reserved.
                        </p>
                    </div>

                </div>
            </div>


        </div>
    )
}

export default SubscriptionForm;