import React from 'react'
import AppNavBar from "@/components/widgets/AppNavBar";

const SubscriptionLayout = async({children}: { children: React.ReactNode }) => {

    return (
        <div className={'min-h-[calc(100dvh)] bg-top bg-no-repeat bg-cover bg-gradient-main-chat'}>
            <AppNavBar/>
            <div className={`min-h-[calc(100dvh-58px)] w-full flex justify-center overflow-y-hidden`}>
                <main className={'max-w-[568px] flex items-center justify-center w-full h-full overflow-auto'}>
                    {children}
                </main>
            </div>
        </div>
    )
}

export default SubscriptionLayout