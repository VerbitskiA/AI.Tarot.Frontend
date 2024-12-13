'use client'
import { Card, CardBody } from "@nextui-org/card";
import React, {FC, useEffect, useState} from "react";
import { Image } from "@nextui-org/image";

interface Card {
    id: number;
    oracles: number;
    price: number;
    image: string;
}

interface Props {
    cards: Card[];
    selectedCard: Card;
    setSelectedCard: React.Dispatch<React.SetStateAction<Card>>;
}

const OracleCards: FC<Props> = ({cards, selectedCard, setSelectedCard}) => {


    const selectedCardObj = cards.find(card => card.id === selectedCard.id);
    if (!selectedCardObj) {
        console.error('Selected card not found!');
        return null;
    }

    const sortedCards = [
        ...cards.filter(card => card.id !== selectedCard.id).slice(0, 1),
        selectedCardObj, // Выбранную карточку в центр
        ...cards.filter(card => card.id !== selectedCard.id).slice(1),
    ];

    return (
        <div className="relative w-full flex justify-center items-center overflow-visible">
            <div className="flex gap-4  items-end">
                {sortedCards.map((card, index) => (
                    <Card
                        key={card.id}
                        isPressable
                        disableRipple
                        onPress={() => setSelectedCard(card)}
                        className={`${
                            selectedCard.id === card.id
                                ? 'border-3 border-[#27ACC9] transform z-10'
                                : 'border-transparent transform'
                        } cursor-pointer relative overflow-visible transition-all`}
                    >
                        <CardBody
                            className={`${
                                selectedCard.id === card.id
                                    ? 'bg-[#27ACC9] m-[5px]'
                                    : 'bg-[#A3C6CD]'
                            } bg-opacity-25 p-0 text-center flex flex-col py-2 w-[150px]  h-[140px] overflow-visible rounded backdrop-blur-xl transform transition-all justify-between`}
                        >
                            <div className="relative h-full flex items-center justify-center overflow-visible">
                                {/* Контейнер для изображения */}
                                <div className="w-12 h-12 z-10">
                                    <Image
                                        src={card.image}
                                        alt="Oracles"
                                        height={48}
                                        width={48}
                                        removeWrapper
                                        className="relative z-10"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col justify-between">
                                <p className="font-medium">{card.oracles} Oracles</p>
                                <p className="text-[#27ACC9] font-light text-xs">${card.price}</p>
                            </div>
                        </CardBody>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default OracleCards;
