import React from "react";
import {useRouter} from "next/navigation";
import {deleteCookie} from "cookies-next";
import Link from "next/link";
import {useConfiguration} from "@/components/providers/ConfigurationProvider";
import BASE_URL from "@/configs/http-service/constants/baseUrl";


const LogoutButton = () => {
    const router = useRouter();
    const { fetchConfiguration } = useConfiguration();

    const handleLogout = async(e: any) => {
        e.preventDefault()
        deleteCookie('ai-tarot-id')
        const res = await fetch(`${BASE_URL}api/account/logout`, {
            method: 'POST',
            // source: 'client',
            credentials: 'include'
        })
        await fetchConfiguration();
        if(res.status === 401) {
            router.push('/auth/onboard')
        }
        router.push('/auth/onboard')
    }

    return (
        <>
            <Link className={"text-[#c4c4c4] hover:text-[#ffffff] transition-colors"} onClick={(e) => handleLogout(e)} href={'/auth/onboard'}>
                Log Out
            </Link>
        </>
    )
}

export default LogoutButton;