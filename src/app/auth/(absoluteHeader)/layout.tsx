import React from "react"
import AppNavBar from "@/components/widgets/AppNavBar"
import "@/app/auth/(absoluteHeader)/index.css"

type AuthLayoutWithAbcoluteHeaderProps = {
    children: React.ReactNode
}

const AuthLayoutWithAbcoluteHeader = async ({
    children
}: AuthLayoutWithAbcoluteHeaderProps) => {
    return (
        <div
            className={
                "layoutWithAbsoluteHeader h-[100dvh] w-full bg-gradient-with-image bg-cover bg-center"
            }
        >
            <AppNavBar />
            <div
                className={`flex h-full w-full items-center justify-center overflow-y-hidden`}
            >
                <main
                    className={"h-full w-full max-w-[520px] overflow-auto px-2"}
                >
                    {children}
                </main>
            </div>
        </div>
    )
}

export default AuthLayoutWithAbcoluteHeader
