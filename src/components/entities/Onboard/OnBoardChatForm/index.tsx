'use client'
import React, {useEffect, useState} from 'react'
import {Button, cn} from "@nextui-org/react";
import {CircleHelp} from "lucide-react";
import ModalComponent from "@/components/shared/ModalComponent";
import {useRouter} from "next/navigation";
import ImageBlock from "@/components/entities/Auth/ImageBlock";
import QuestionInput from "@/components/shared/Inputs/QuestionInput";


const OnBoardChatForm = () => {
	const [showFirstMessage, setShowFirstMessage] = useState(false)
	const [showSecondMessage, setShowSecondMessage] = useState(false)
	const [howItWorksModalOpen, setHowItWorksModalOpen] = useState(false)
	const router = useRouter();
	const [questionInputValue, setQuestionInputValue] = useState('');
	const [loading, setLoading] = useState(false);
	const [time, setTime] = useState<string>("");

	useEffect(() => {
		const now = new Date();
		setTime(
			now.toLocaleTimeString("en-US", {
				hour: "2-digit",
				minute: "2-digit",
				hour12: false
			})
		);
	}, []);

	useEffect(() => {
		setTimeout(() => {
			setShowFirstMessage(true)
		}, 2000);
		setTimeout(() => {
			setShowSecondMessage(true)
		}, 5000);
	}, []);

	const handleAskQuestion = () => {
		localStorage.setItem('onboardQuestion', questionInputValue)
		router.push(`/auth/register?onboardQuestion=true`)
		setQuestionInputValue('');
		return
	}


	return (
		<>
			<div className="grid place-items-start h-full">
				<div className="flex flex-col min-h-[calc(100dvh-58px)] h-full justify-center gap-2 w-full">
					<div
						className={`z-10 flex-grow overflow-y-auto max-h-[calc(100dvh-150px)] sm:max-h-[calc(100dvh-150px)]'`}>
						<div className={'flex flex-col w-full gap-6 h-full '}>
							<div className={'w-full flex flex-col justify-center text-center'}>
								<ImageBlock imageSrc={'/onboard.png'}/>
								<div
									className={`${showSecondMessage ? 'hidden' : ''} flex gap-2 text-center items-center justify-center w-full pb-2 pt-3`}>
									<div className="flex space-x-1 justify-center items-center">
										<div
											className="w-1.5 h-1.5 bg-[#BEBEBE] animate-scaleUpDown rounded-full"></div>
										<div
											className="w-1.5 h-1.5 bg-[#BEBEBE] animate-scaleUpDown2 rounded-full"></div>
										<div
											className="w-1.5 h-1.5 bg-[#BEBEBE] animate-scaleUpDown3 rounded-full"></div>
									</div>
									<p className={'text-[#BEBEBE]'}>
										Aita is typing
									</p>
								</div>
								<div
									className={`${showSecondMessage && 'pt-5'} text-medium sm:text-lg flex pl-2 flex-col gap-2 text-start items-start w-[70vw] max-w-[396px]`}>
									<div
										className={`${!showFirstMessage && 'hidden'} px-4 py-3 flex items-end flex-col bg-[#343434] rounded-tr-2xl rounded-b-3xl`}>
										<p className={''}>
											Hi 💚 I'm Aita, an AI tarot reader
										</p>
										<span className={''}>
                                            {time}
                                        </span>
									</div>
									<div
										className={`${!showSecondMessage && 'hidden'} px-4 py-3 flex items-end flex-col bg-[#343434] rounded-tr-2xl rounded-b-3xl`}>
										<p className={''}>
											Ask me anything, and I’ll provide your
											<span className={'font-bold'}>{' tarot reading for free'}</span> with a
											heartfelt interpretation of your situation. I’ll also give you helpful advice! 🔮
										</p>
										<span className={''}>
                                            {time}
                                        </span>
									</div>
									<ModalComponent
										open={howItWorksModalOpen}
										modalSize={'md'}
										setOpen={setHowItWorksModalOpen}
										nonButtonTrigger={
											<div onClick={() => setHowItWorksModalOpen(true)}
													 className={`${!showSecondMessage && 'hidden'} cursor-pointer flex gap-1 text-[#27ACC9] hover:text-[#32cbed] transition-colors pl-2 pt-1`}>
												<CircleHelp className={'rounded-full text-white bg-[#27ACC9]'}/>
												<p>How it works?</p>
											</div>
										}
									>
										<div className={'flex flex-col gap-8'}>
											<p>
												I am Aita, an <span className={'font-bold'}>AI tarot reader developed with the guidance of many real-life tarot readers</span>. 
												I work almost like a human, offering interpretations, insights, and advice just as they would.
											</p>
											<p>
												<span className={'font-bold'}>Here’s how it works:</span>
												<ol type={'1'} className={'list-decimal pl-6'}>
													<li>
														Write your question in the text field below ✍️
													</li>
													<li>
														I’ll provide you with:
													</li>
													<ul className={'list-disc pl-5'}>
														<li>A detailed tarot spread with the interpretation 🃏</li>
														<li>Card photos 📸</li>
													</ul>
												</ol>
											</p>
											<p>
												✨ <span className={'font-bold'}>Special Offer!</span>
												Your first tarot reading is a gift from me — <span
												className={'font-bold'}>absolutely free</span>.
												Experience the magic without any commitment! 🌟
											</p>
										</div>
										<div className={'pt-2 pb-4 w-full items-center'}>
											<Button size={'lg'}
															className={cn(`flex w-full items-center gap-2 sticky shadow-button bg-[#27ACC9] data-[hover=true]:bg-[#32cbed] h-[60px] font-semibold text-xl rounded-[60px]`)}
															type={'button'}
															onClick={() => router.push('/auth/register')}
											>
												Ask question for free
											</Button>
										</div>
									</ModalComponent>
								</div>
							</div>

						</div>
					</div>
					<QuestionInput
						questionInputValue={questionInputValue}
						setQuestionInputValue={setQuestionInputValue}
						handleAskQuestion={handleAskQuestion}
						loading={loading}
					/>
				</div>
			</div>
		</>
	)
}

export default OnBoardChatForm