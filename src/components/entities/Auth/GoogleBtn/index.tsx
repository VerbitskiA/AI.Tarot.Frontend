"use client"

import { FC } from "react"
import { useState, useEffect } from "react"
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

const initialBtnText = "Continue with Google"

type GoogleButtonProps = {
	redirectPath: string
}

const GoogleBtn: FC<GoogleButtonProps> = ({redirectPath}) => {
    // const [btnText, setBtnText] = useState(initialBtnText)
    const { data: session, update } = useSession()
	const router = useRouter()

	useEffect(() => {
		console.log("google btn mount")
	}, [])

    useEffect(() => {
        if (session) {
			// TODO: validate path
			router.push(redirectPath)
            // setBtnText(`Sign out ${userName}`)
        }
    }, [session])

    const handleClick = async () => {
		if (!session) {
			// TODO: redirect after signIn
			const res = await signIn("google", {redirect: false})
		}

        // if (session) {
        //     signOut()
        // }
    }

    return (
        <button
            className="googleAuthButton flex h-[var(--google-sign-in-height)] w-full items-center justify-center rounded-full bg-[var(--bg-color-google-sign-in)] p-[0_20px] text-xl font-semibold text-[var(--text-color-google-sign-in)] customMinH769:h-[76px] customMinH769:text-2xl"
            onClick={handleClick}
			type="button"
        >
            <img
                className="mr-[12px] h-[32px] w-[32px]"
                src="/google-icon.svg"
            />
            <span>{initialBtnText}</span>
        </button>
    )
}

export default GoogleBtn
