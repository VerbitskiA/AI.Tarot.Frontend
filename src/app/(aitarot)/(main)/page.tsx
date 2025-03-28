import React, { FC } from "react"
import MainPageForm from "@/components/entities/Main/MainPageForm"
import { redirect } from "next/navigation"
import { Spread } from "@/lib/types/spread.types"
import fetchService from "@/configs/http-service/fetch-settings"
import { askOnboardQuestion } from "@/lib/serverActions/chat"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

type Props = {
    searchParams: {
        chatId?: string
        startScreen?: string
    }
}

const Page: FC<Props> = async ({ searchParams }) => {
    let tokens
    const session = await getServerSession(authOptions)

    if (session && session.user.tokens) {
        tokens = session.user.tokens
    }

    console.log("tokens main page", tokens)

    if (!tokens) {
        redirect("/auth/onboard")
    }

    let spreadsData: Spread[] = []

    try {
        const { ok, data } = await fetchService.get<Spread[]>("/api/spread/all", {
            next: {
                tags: ["spreads"]
            },
            tokens
        })

        if (!ok) {
            redirect("/auth/onboard")
        }
        else {
            spreadsData = data
        }
    } catch (error) {
        console.error(error)
    }

    const handleAskQuestion = async (fd: FormData) => {
        "use server"
        const res = await askOnboardQuestion(fd)
        if (res.status === "ok") {
            redirect(`/auth/register?onboardQuestion=${fd.get("question")}`)
        }
        return res
    }
    return (
        <>
            <MainPageForm
                olderSpreads={spreadsData}
                searchParams={searchParams}
                handleAskQuestion={handleAskQuestion}
            />
        </>
    )
}

export default Page
