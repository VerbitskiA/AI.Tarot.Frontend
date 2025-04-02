"use client"

import React from "react";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {useConfiguration} from "@/components/providers/ConfigurationProvider";
import { signOut } from "next-auth/react";
import { logoutUser } from "@/lib/serverActions/auth";
import { getSession } from "next-auth/react";

const LogoutButton = () => {
    const router = useRouter();
    const { fetchConfiguration } = useConfiguration();

    const handleLogout = async(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault()

        const session = await getSession()
        const tokens = session?.user.tokens

        if (tokens) {
            const res = await logoutUser(tokens)

            if (res.ok) {
                await fetchConfiguration()
            }
        }

        await signOut({redirect: false})

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
