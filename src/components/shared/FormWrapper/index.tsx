'use client'
import React, {FC, useRef} from 'react'
import SubmitButton from "@/components/shared/Buttons/SubmitButton";

type CustomFormProps = {
    children: React.ReactNode
    action: (fd: FormData) => Promise<any>,
    modalControl?: React.Dispatch<React.SetStateAction<boolean>>,
    setInvalid?: React.Dispatch<React.SetStateAction<boolean>>,
    readonly actionLabel?: string,
    calcHeight?: string,
    withOutDefaultButton?: boolean,
    disablePaddings?: boolean,
    withoutPopover?: boolean,
    clearAfterSubmit?: boolean,
    customButton?: React.ReactNode,
    infoUnderButton?: React.ReactNode | boolean
} & React.ComponentProps<'form'>

const FormWrapper: FC<CustomFormProps> = ({
                                              withoutPopover = false,
                                              children,
                                              modalControl,
                                              actionLabel = 'Сохранить',
                                              action,
                                              withOutDefaultButton = false,
                                              disablePaddings = false,
                                              clearAfterSubmit = false,
                                              setInvalid,
                                              infoUnderButton,
                                              customButton,
                                              calcHeight
                                          }) => {

    const formRef = useRef<HTMLFormElement>(null)

    const handleSubmit = async (fd: FormData) => {
        const actionResponse = await action(fd)
        // console.log('FORM SUBMISSION RESULTS:', actionResponse)
        const {status} = actionResponse !== undefined ? actionResponse : {status: 'ok'}
        switch (status) {
            case 'ok':
                modalControl && modalControl(false)
                clearAfterSubmit && formRef?.current?.reset()
                break
            case 'error':
                setInvalid && setInvalid(true)
                break
        }
        return
    }

    return (
        <form
            action={handleSubmit}
            className={`flex flex-col min-h-[calc(100dvh-58px)] h-full justify-center gap-2 w-full`}
            onClick={e => e.stopPropagation()}
            ref={formRef}
        >
            <div className={`flex-grow overflow-y-auto ${calcHeight ? calcHeight : infoUnderButton ? 'max-h-[calc(100dvh-172px)] sm:max-h-[calc(100dvh-172px)]' : 'max-h-[calc(100dvh-132px)] sm:max-h-[calc(100dvh-157px)]'}`}>
                {children}
            </div>
            {
                !withOutDefaultButton &&
                    <div className="flex-shrink-0 flex justify-center flex-col gap-2 w-full ifems-center">
                        <SubmitButton label={actionLabel}/>
                        {infoUnderButton && infoUnderButton}

                    </div>
            }
            {
                customButton &&
                    <div className="flex-shrink-0 flex justify-center flex-col gap-2 w-full ifems-center">
                        {customButton}
                    </div>
            }
        </form>
    )
}

export default FormWrapper