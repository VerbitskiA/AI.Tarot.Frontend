import React from 'react'
import {getConfiguration} from "@/lib/serverActions/auth";
import {redirect} from "next/navigation";

const AppLayout = async({children}: { children: React.ReactNode }) => {
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