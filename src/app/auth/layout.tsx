import React from 'react'
import AppNavBar from "@/components/widgets/AppNavBar";

const AuthLayout = async({children}: { children: React.ReactNode}) => {
    return (
        <>
            <div className={'min-h-[calc(100dvh)] bg-gradient-with-image bg-cover bg-center'}>
                <AppNavBar/>
                <div className={`min-h-[calc(100dvh-58px)] w-full flex items-center justify-center overflow-y-hidden`}>
                    <main className={'max-w-[520px] w-full px-2 h-full overflow-auto'}>
                        {children}
                    </main>
                </div>
            </div>
        </>
    )
}

export default AuthLayout