import React from "react";


const WelcomeMessage = ({isDesktop}: {isDesktop: boolean}) => {
    return (
        <div
            className={`z-10 flex-grow flex flex-col ${isDesktop ? 'gap-8 max-h-[calc(100dvh-300px)] min-h-[calc(100dvh-180px)] sm:max-h-[calc(100dvh-300px)]' : 'gap-2 max-h-[calc(100dvh-150px)] sm:max-h-[calc(100dvh-150px)]'} px-2 h-full justify-start items-start `}>
            <p>
                Getting a tarot spread from me is simple
            </p>
            <p className={''}>
                <ol type={'1'} className={'list-decimal pl-6'}>
                    <li>
                        <span className={'font-bold'}>Write your question </span>
                        in the text field below ✍️
                    </li>
                    <li>
                        I’ll provide you with:
                        <ul className={'list-disc pl-5'}>
                            <li>
                                A detailed tarot spread 🃏
                            </li>
                            <li>
                                Card photos 📸
                            </li>
                        </ul>
                    </li>
                </ol>
            </p>
            <p>
                Let&apos;s explore what the cards have to say! ✨
            </p>
        </div>
    )
}

export default WelcomeMessage
