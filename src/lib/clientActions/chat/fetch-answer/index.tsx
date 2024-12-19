import React from "react";
import fetchService from '@/configs/http-service/fetch-settings';
import {Spread} from "@/lib/types/spread.types";

interface Message {
    message: string;
    isUser: boolean;
    images?: string[];
}

const fetchAnswer = async (
    question: string,
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
    setSpreadCompleted: React.Dispatch<React.SetStateAction<boolean>>,
    fetchConfiguration: () => Promise<void>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setAitaIsTyping: React.Dispatch<React.SetStateAction<boolean>>,
    router: any
) => {
    setLoading(true);
    setAitaIsTyping(true);
    try {
        // console.log('Fetching answer:', question); TODO
        const res = await fetchService.post<Spread>('api/spread/create/', {
            body: JSON.stringify({ question }),
            credentials: 'include',
            source: 'client',
            headers: { 'Content-Type': 'application/json' },
        });

        if (res.ok) {
            const { answer, images, spreadCompleted } = res.data;
            setSpreadCompleted(spreadCompleted)
            // console.log(spreadCompleted)
            setLoading(false);
            setMessages(prev => {
                if (!prev.some(msg => msg.message === answer)) {
                    return [...prev, {message: answer, isUser: false, images}];
                }
                return prev;
            })
            await fetchConfiguration();
        } else if (res.status === 400) {
            router.push('/buy/oracles');
        }
    } catch (error) {
        console.error('Error fetching answer:', error);
    } finally {
        setAitaIsTyping(false);
    }
};

export default fetchAnswer;
