import React from 'react'
import {getConfiguration} from "@/lib/serverActions/auth";
import {redirect} from "next/navigation";
import BASE_URL from "@/configs/http-service/constants/baseUrl";

const AppLayout = async({children}: { children: React.ReactNode }) => {
    const config = await getConfiguration()

    return (
        <>
            {children}
        </>
    )
}

export default AppLayout