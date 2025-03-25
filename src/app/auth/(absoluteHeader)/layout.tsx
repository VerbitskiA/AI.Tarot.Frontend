import React from "react"
import AppNavBar from "@/components/widgets/AppNavBar"
import "@/app/auth/(absoluteHeader)/index.css"

type AuthLayoutWithAbsoluteHeaderProps = {
    children: React.ReactNode
}

const AuthLayoutWithAbsoluteHeader  = async ({
    children
}: AuthLayoutWithAbsoluteHeaderProps) => {
    return (
        <div
            className={
                "layoutWithAbsoluteHeader h-[100dvh] w-full bg-gradient-with-image bg-cover bg-center overflow-y-auto"
            }
        >
            <AppNavBar />
            <div
                className={`flex h-full w-full items-center justify-center`}
            >
                <main
                    className={"h-full w-full max-w-[520px] px-2"}
                >
                    {children}
                </main>
            </div>
        </div>
    )
}

export default AuthLayoutWithAbsoluteHeader 
