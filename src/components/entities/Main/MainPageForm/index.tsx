'use client'
import React, {FC} from 'react'
import {ActionResponse} from "@/configs/http-service/fetch-settings/types";
import {Spread} from "@/lib/types/spread.types";
import {useMediaQuery} from "react-responsive";
import DesktopMainPage from "@/components/entities/Main/MainPageForm/DesktopMainPage";
import MobileMainPage from "@/components/entities/Main/MainPageForm/MobileMainPage";
import LaptopMainPage from "@/components/entities/Main/MainPageForm/LaptopMainPage";

type Props = {
    olderSpreads: Spread[],
    handleAskQuestion: (fd: FormData) => Promise<ActionResponse>,
    searchParams: {
        // onboardQuestion?: string
        chatId?: string
    }
}


const MainPageForm: FC<Props> = ({olderSpreads, searchParams}) => {
    const isLaptop = useMediaQuery({ minWidth: 1024 });
    const isDesktop = useMediaQuery({ minWidth: 1440 });

    return (
        <>
            {isDesktop ?
                <DesktopMainPage olderSpreads={olderSpreads} searchParams={searchParams}/>
                :
                isLaptop ?
                    <LaptopMainPage olderSpreads={olderSpreads} searchParams={searchParams}/>
                    :
                    <MobileMainPage olderSpreads={olderSpreads} searchParams={searchParams}/>
            }

        </>


    )
}

export default MainPageForm
