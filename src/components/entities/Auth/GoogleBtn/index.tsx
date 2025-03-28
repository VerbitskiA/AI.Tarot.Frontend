"use client"

import { useState, useEffect } from "react"
import { useSession, signIn } from "next-auth/react"

const initialBtnText = "Continue with Google"

function GoogleBtn() {
    const [btnText, setBtnText] = useState(initialBtnText)
    const { data: session } = useSession()

    useEffect(() => {
        const userName = session?.user.name
        if (session && userName) {
            setBtnText(userName)
        }      
    }, [session])


    // if (session) {
    //     setBtnText(session.user.name || "Hello")
    // }

    // console.log("user", session.user)
    // return (
    //     <>
    //         Signed in as {session.user?.email} <br />
    //         <button onClick={() => signOut()}>Sign out</button>
    //     </>
    // )

    const handleClick = async () => {
        const res = await signIn("google")
        // TODO:
    }

    return (
        <button 
            className="googleAuthButton flex h-[var(--google-sign-in-height)] w-full items-center justify-center rounded-full bg-[var(--bg-color-google-sign-in)] p-[0_20px] text-xl font-semibold text-[var(--text-color-google-sign-in)] customMinH769:h-[76px] customMinH769:text-2xl"
            onClick={handleClick}
        >
            <img
                className="mr-[12px] h-[32px] w-[32px]"
                src="/google-icon.svg"
            />
            <span>{btnText}</span>
        </button>
    )
}

export default GoogleBtn
