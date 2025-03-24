"use client"

import { useSession, signIn } from "next-auth/react"

export default function GoogleBtn() {
    const btnText = "Continue with Google"

    // const { data: session } = useSession()

    // if (session) {
        // console.log("user", session.user)
        // return (
        //     <>
        //         Signed in as {session.user?.email} <br />
        //         <button onClick={() => signOut()}>Sign out</button>
        //     </>
        // )
    // }

    const handleClick = () => {
        signIn('google')
    }

    return (
        <div className=" w-full p-[0_20px] flex justify-center h-[var(--google-sign-in-height)] customMinH769:h-[76px] bg-[var(--bg-color-google-sign-in)] text-[var(--text-color-google-sign-in)] rounded-[var(--google-sign-in-height)] font-semibold text-xl customMinH769:text-2xl">
            <img className=" mr-[12px]" src="/google-icon.svg"/>
            <button onClick={handleClick}>{btnText}</button>
        </div>
    )
}
