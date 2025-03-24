"use client"
import React, { FC, useRef } from "react"
import SubmitButton from "@/components/shared/Buttons/SubmitButton"

type CustomFormProps = {
    children: React.ReactNode
    action: (fd: FormData) => Promise<any>
    modalControl?: React.Dispatch<React.SetStateAction<boolean>>
    setInvalid?: React.Dispatch<React.SetStateAction<boolean>>
    readonly actionLabel?: string
    // calcHeight?: string
    // withOutDefaultButton?: boolean
    // disablePaddings?: boolean
    // withoutPopover?: boolean
    clearAfterSubmit?: boolean
    // customButton?: React.ReactNode
    infoUnderButton?: React.ReactNode | boolean
    isAbsoluteHeader?: boolean
} & React.ComponentProps<"form">

const FormWrapper: FC<CustomFormProps> = ({
    // withoutPopover = false,
    children,
    modalControl,
    actionLabel = "Сохранить",
    action,
    // withOutDefaultButton = false,
    // disablePaddings = false,
    clearAfterSubmit = false,
    setInvalid,
    infoUnderButton,
    // customButton,
    // calcHeight,
    isAbsoluteHeader
}) => {
    const formRef = useRef<HTMLFormElement>(null)

    const handleSubmit = async (fd: FormData) => {
        const actionResponse = await action(fd)
        // console.log('FORM SUBMISSION RESULTS:', actionResponse)
        const { status } =
            actionResponse !== undefined ? actionResponse : { status: "ok" }
        switch (status) {
            case "ok":
                modalControl && modalControl(false)
                clearAfterSubmit && formRef?.current?.reset()
                break
            case "error":
                setInvalid && setInvalid(true)
                break
        }
        return
    }

    /* TODO: calcheight

    let formInnerMaxHeight = ""

    if (calcHeight) {
        if (infoUnderButton) {
            formInnerMaxHeight = "max-h-[calc(100dvh-172px)] sm:max-h-[calc(100dvh-172px)]"
        }
        else {
            formInnerMaxHeight = "max-h-[calc(100dvh-132px)] sm:max-h-[calc(100dvh-157px)]"
        }
    }
        
    */

    /* formInnerMaxHeight - height of content (without buttonsBlock) */
    const formInnerMaxHeight = "max-h-[calc(100dvh-132px)] sm:max-h-[calc(100dvh-157px)]"

    const buttonsBlock = (
        <div className="ifems-center flex w-full flex-shrink-0 flex-col justify-center gap-2">
            <SubmitButton label={actionLabel} />
            {infoUnderButton && infoUnderButton}
        </div>
    )

    return (
        <form
            action={handleSubmit}
            className={`flex h-full ${isAbsoluteHeader ? "" : "min-h-[calc(100dvh-var(--header-height))]"} w-full flex-col justify-center gap-2`}
            onClick={(e) => e.stopPropagation()}
            ref={formRef}
        >
            <div
                className={`flex-grow overflow-y-auto ${formInnerMaxHeight}`}
            >
                {children}
            </div>
            {buttonsBlock}
            {/* {!withOutDefaultButton && (
                <div className="ifems-center flex w-full flex-shrink-0 flex-col justify-center gap-2">
                    <SubmitButton label={actionLabel} />
                    {infoUnderButton && infoUnderButton}
                </div>
            )}
            {customButton && (
                <div className="ifems-center flex w-full flex-shrink-0 flex-col justify-center gap-2">
                    {customButton}
                </div>
            )} */}
        </form>
    )
}

export default FormWrapper
