import React from 'react'
import {getConfiguration} from "@/lib/serverActions/auth";
import {redirect} from "next/navigation";
import BASE_URL from "@/configs/http-service/constants/baseUrl";

const AppLayout = async({children}: { children: React.ReactNode }) => {
    console.log(BASE_URL)
    const config = await getConfiguration()
    if(!config.currentUser.isAuthenticated) {
        return redirect('/auth/onboard')
    }
    return (
        <>
            {children}
        </>
    )
}

export default AppLayout