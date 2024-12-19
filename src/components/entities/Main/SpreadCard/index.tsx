'use client'
import {Spread} from "@/lib/types/spread.types";
import {Image} from "@nextui-org/image";
import React, {FC} from "react";
import {useRouter} from "next/navigation";


type SpreadCardProps = {
    spread: Spread
    redirectType: 'params' | 'page'
}
const SpreadCard: FC<SpreadCardProps> = ({spread, redirectType}) => {
    const router = useRouter();
    return (
        <div onClick={
            () => {
                redirectType === 'page' ?
                    router.push(`/chat/${spread.id}?chatDate=${spread.date}` )
                    :
                    router.push(`?chatId=${spread.id}` )
            }
        }
             className={'flex gap-2 justify-between items-center w-full cursor-pointer p-4 border-[1px] border-[#27ACC9] hover:border-[#32cbed] transition-colors rounded-xl shadow-spread-card backdrop-blur-spread-card'}>
            <div className={'flex flex-col gap-1 w-full truncate text-start'}>
                <p className={'text-sm sm:text-lg font-semibold truncate w-full'}>{spread.question}</p>
                {/*<p className={'text-sm font-normal'}>{spread.answer}</p>*/}
                <p className={'text-xs sm:text-sm font-normal'}>{spread.date}</p>
            </div>
            <div className={'w-8 flex justify-center items-center'}>
                <Image src={'/arrowForward.svg'} height={32} width={32}/>
            </div>
        </div>
    )
}

export default SpreadCard;