'use client'
import React, {FC} from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter} from '@nextui-org/react'
import {Cross1Icon} from "@radix-ui/react-icons";
import {Button} from "@/components/base/button";

type ModalComponentProps = {
    children?: React.ReactNode,

    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    modalHeader?: string,
    buttonSize?: 'sm' | 'md',
    buttonVariant?: 'destructive' | 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'bordered',
    isDismissable?: boolean,
     
    
    modalSize?: 'sm' | 'md' | 'lg' | 'xl' | "2xl" | "3xl" | "4xl" | "5xl" | "full",
    actionLabel?: string,
    nonActionTrigger?: string | React.ReactNode | boolean,
    withoutModalHeader?: boolean,
    withoutAction?: boolean
    nonButtonTrigger?: string | React.ReactNode | boolean,
} & ConditionalFormAction & ConditionalButtonView


type ConditionalFormAction = | WithFormAction | WithoutFormAction
type WithoutFormAction = {
    formAction?: never
}
type WithFormAction = {
    formAction: () => Promise<any>,
}

type ConditionalButtonView = | ModalButtonProps | ModalIconProps
type ModalButtonProps = {
    label?: React.ReactNode
    isIcon?: false,
    icon?: never
}
type ModalIconProps = {
    label?: never
    isIcon?: true,
    icon: React.ReactNode
}

type UncontrolledModalProps = {
    open: null;
    setOpen: null
}
type ControlledModalProps = {
    open: boolean;
    setOpen: () => void,
    formAction: () => void,
    formActionLabel: string
}

const ModalComponent: FC<ModalComponentProps> = ({
                                                     children,
                                                     open = false,
                                                     formAction,
                                                     setOpen,
                                                     isIcon = false,
                                                     isDismissable = true,
                                                     label,
                                                     buttonSize = 'md',
                                                     modalSize = 'md',
                                                     icon,
                                                     actionLabel = 'Сохранить',
                                                     nonButtonTrigger,
                                                     buttonVariant = 'default',
                                                     nonActionTrigger = false,
                                                     withoutAction = true,
                                                     modalHeader,
                                                     withoutModalHeader = false,
                                                     // ...props
                                                 }) => {

    // const {isOpen, onOpen, onOpenChange} = useDisclosure()

    const handleAction = async () => {
        if(formAction) {
            await formAction()
            setOpen(false)
        } else {
            setOpen(false)
        }
    }


    return (
        <>
            {
                nonButtonTrigger
                ?? <Button onClick={() => setOpen(!open)} size={isIcon ? 'icon' : 'default'} variant={buttonVariant}
                           color={'primary'}
                           className={`${buttonVariant === 'link' ? 'pt-0 pb-0 pl-0 py-0 m-0 h-fit w-fit' : 'px-2'}`}>
                        {
                            isIcon ? (
                                <p>{icon}</p>
                            ) : (
                                <p>{label}</p>
                            )
                        }
                    </Button>
            }
            <Modal classNames={{
                wrapper: 'm-0',
                closeButton: 'bg-black bg-opacity-60 p-1.5 w-8 h-8 rounded-full items-center justify-center flex'
            }}
                closeButton={
                <Button variant={`${withoutModalHeader ? 'default' : 'ghost'}`} className={'p-0'} size={'icon'}>
                    <Cross1Icon className={`${withoutModalHeader && 'text-white'}`}/>
                </Button>}
                   isOpen={open} isDismissable={isDismissable} onOpenChange={setOpen} size={modalSize} className={`${withoutModalHeader && 'p-0 w-fit h-fit'} bg-[#343434] rounded-b-none sm:rounded-b-large m-0 overflow-hidden max-h-[85vh]`}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            {!withoutModalHeader &&
                                <ModalHeader className="flex flex-col gap-1">
                                    {modalHeader}
                                </ModalHeader>
                            }
                            <ModalBody className={`${withoutModalHeader && 'p-0'} px-4 overflow-auto`}>
                                {children}
                            </ModalBody>
                            {!withoutAction &&
                                <ModalFooter className={`${withoutModalHeader && 'p-0'}`}>
                                    {nonActionTrigger
                                    ??
                                        <>
                                            <Button color="danger" variant={"outline"} onClick={onClose}>
                                                Закрыть
                                            </Button>
                                            <Button color="primary" type={'submit'} onClick={handleAction}>
                                                {actionLabel}
                                            </Button>
                                        </>
                                    }

                                </ModalFooter>
                            }
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

export default ModalComponent
