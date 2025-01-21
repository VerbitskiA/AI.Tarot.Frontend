'use client'
import {Button} from "@nextui-org/react";
import React, {useEffect, useState} from "react";
import OracleCards from "@/components/entities/Buy/OracleCards";
import fetchService from "@/configs/http-service/fetch-settings";
import {StripeSessionType} from "@/lib/types/stripe-session.types";
import {useRouter} from "next/navigation";

type Card = {
	packageId: number;
	count: number;
	price: number;
	image: string;
};

const BuyOraclesForm = () => {
	const router = useRouter()

	const [cards, setCards] = useState<Card[]>([]);
	const [selectedCard, setSelectedCard] = useState<Card | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetchService.get("api/payments/credits-packages/", {
					credentials: "include",
					source: "client",
					headers: {
						"Content-Type": "application/json",
						Accept: "*/*",
					},
				});

				console.log("Полученные данные:", res.data); // Убедимся, что данные приходят
				if (Array.isArray(res.data)) {
					setCards(res.data);
					// Выбираем карту с индексом 1, если она есть
					if (res.data[1]) {
						setSelectedCard(res.data[1]);
					}// Устанавливаем данные в состояние
				} else {
					console.error("Ожидался массив, но получен другой тип данных");
				}
			} catch (error) {
				console.error("Ошибка при загрузке данных:", error);
			}
		};

		fetchData();
	}, []);

	// Проверяем обновление состояния
	useEffect(() => {
		console.log("Обновлённое состояние packages:", cards);
	}, [cards]);

	// Если данные ещё не загружены, возвращаем null
	if (cards.length === 0) {
		return null;
	}


	const pay = async () => {
		const res = await fetchService.post<{ sessionId: string }>('api/payments/create-session', {
			body: JSON.stringify({
				packageId: 1,
				description: 'Buy Oracles'
			}),
			credentials: 'include',
			source: 'client',
			headers: {
				'Content-Type': 'application/json'
			}
		})
		if (res.ok) {
			const sessionId = res.data.sessionId
			const sessionRes = await fetchService.get<StripeSessionType>(`api/payments/session/${sessionId}`, {
				credentials: 'include',
				source: 'client',
				headers: {
					'Content-Type': 'application/json'
				}
			})

			if (sessionRes.ok) {
				router.push(sessionRes.data.url)
			}
		}
	}

	return (
		<div className="flex flex-col gap-6 min-h-[calc(100dvh-58px)] justify-end overflow-hidden w-screen">
			<h2 className="text-3xl lg:text-[44px] text-center font-semibold px-4">
				Add more Oracles to ask next question
			</h2>
			<div className="flex flex-col gap-6 text-center items-center overflow-visible justify-between lg:px-12">
				<div className="w-full overflow-visible ">
					<OracleCards cards={cards} selectedCard={selectedCard} setSelectedCard={setSelectedCard}/>
				</div>
				<p className="text-sm lg:text-lg">100 Oracles = 1 Question</p>
				<div className="flex w-full flex-col gap-6 pb-3 lg:pb-7 px-4">
					<Button onClick={() => pay()}
									className="flex items-center gap-2 sticky shadow-button bg-[#27ACC9] h-[60px] sm:h-[76px] font-semibold text-xl sm:text-2xl rounded-[60px]"
					>
						Add Oracles
					</Button>
					<div className="flex flex-col gap-2 text-[#9999A3] text-center font-normal text-xs">
						<div className="flex justify-center gap-5">
							<a href="/privacy-policy" className="underline">Privacy Policy</a>
							<a href="/privacy-policy" className="underline">Terms of Service</a>
							<a href="/privacy-policy" className="underline">Refund Policy</a>
						</div>
						<p>© 2024 Aita by Aitarot.io. All rights reserved.</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default BuyOraclesForm;