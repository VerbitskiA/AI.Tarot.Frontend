"use client"

import { FC } from "react"
import { useEffect } from "react"
// import { useState } from "react"
import { useSession, signIn } from "next-auth/react"
// import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

const initialBtnText = "Continue with Google"

type GoogleButtonProps = {
	redirectPath: string
}

const GoogleBtn: FC<GoogleButtonProps> = ({redirectPath}) => {
    // const [btnText, setBtnText] = useState(initialBtnText)
    const { data: session } = useSession()
	const router = useRouter()

    useEffect(() => {
        if (session) {
			// TODO: validate path
			router.push(redirectPath)
            // setBtnText(`Sign out ${userName}`)
        }
    }, [session, redirectPath, router])

    const handleClick = async () => {
		if (!session) {
			// TODO: redirect after signIn
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
            <Image
				width={32}
				height={32}
				alt="google-icon"
                className="mr-[12px]"
                src="/google-icon.svg"
            />
            <span>{initialBtnText}</span>
        </button>
    )
}

export default GoogleBtn
