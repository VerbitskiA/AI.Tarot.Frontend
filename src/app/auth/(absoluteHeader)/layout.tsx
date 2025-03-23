import React from "react"
import AppNavBar from "@/components/widgets/AppNavBar"

const AuthLayoutWithAbsoluteHeader = async ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <div
                className={
                    "h-[100dvh] w-full bg-gradient-with-image bg-cover bg-center"
                }
            >
                <AppNavBar />
                <div
                    className={`flex h-[calc(100dvh-var(--header-height))] justify-center`}
                >
                    <main className={"h-full w-full max-w-[520px]"}>
                        <div className="appContainer h-full">{children}</div>
                    </main>
                </div>
            </div>
        </>
    )
}

export default AuthLayoutWithAbsoluteHeader
