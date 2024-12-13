'use client'
import {Image} from "@nextui-org/image";
import React from "react";
import {usePathname, useRouter} from "next/navigation";

const BackButton = () => {
    const router = useRouter()
    const pathname = usePathname()

    const getLink = () => {
        switch (true) {
            case pathname === '/chat/new':
            case pathname === '/payment/error':
            case pathname === '/payment/success':
            case /^\/chat\/\d+$/.test(pathname):
                return '/';
            case pathname === '/auth/register':
            case pathname === '/auth/approve-email':
            case pathname === '/auth/reset-password':
            case pathname === '/auth/new-password':
                return '/auth';
            case pathname === '/auth':
                return '/auth/register';
            default:
                return '/';
        }
    }

    const getLinkVisible = () => {
        switch (true) {
            case pathname === '/':
            case pathname === '/auth/onboard':
                return false;
            case pathname === '/chat/new':
            case /^\/chat\/\d+$/.test(pathname):
            case pathname === '/auth':
            case pathname === '/auth/register':
            case pathname === '/auth/approve-email':
            case pathname === '/auth/reset-password':
            case pathname === '/auth/new-password':
            case pathname === '/buy/oracles':
            case pathname === '/buy/subscription':
            case pathname === '/payment/error':
            case pathname === '/payment/success':
                return true;
            default:
                return false;
        }
    }


    return (
        getLinkVisible() &&
        <div onClick={() => {
            router.push(getLink())
        }} className={'cursor-pointer w-[15px] h-[15px]'}>
            <Image src={'/chevronLeft.svg'} height={15} width={9}/>
        </div>
    )
}

export default BackButton;