"use client"

import Image from "next/image"
import { FC } from "react"
import { useEffect } from "react"
import { useSession, signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

const initialBtnText = "Continue with Google"

type GoogleButtonProps = {
	redirectPath: string
}

const GoogleBtn: FC<GoogleButtonProps> = ({redirectPath}) => {
    const { data: session } = useSession()
	const router = useRouter()

    useEffect(() => {
        if (session) {
			// TODO: validate path
			router.push(redirectPath)
        }
    }, [session, redirectPath, router])

    const handleClick = async () => {
		if (!session) {
			await signIn("google")
		}
    }

    return (
        <button
            className="googleAuthButton flex h-[var(--google-sign-in-height)] w-full items-center justify-center rounded-full bg-[var(--bg-color-google-sign-in)] p-[0_20px] text-xl font-semibold text-[var(--text-color-google-sign-in)] customMinH769:h-[76px] customMinH769:text-2xl"
            onClick={handleClick}
			type="button"
        >
            <Image
				width="0"
				height="0"
				alt="google-icon"
                className="mr-[12px] w-[32px] h-[32px]"
                src="/google-icon.svg"
            />
            <span>{initialBtnText}</span>
        </button>
    )
}

export default GoogleBtn
