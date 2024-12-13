import React from 'react';
import MessageBubble from "@/components/entities/message/MessageBubble";
import MessageLoadingIndicator from "@/components/entities/message/MessageLoadingIndicator";

interface Message {
    message: string;
    isUser: boolean;
    images?: string[];
}

interface MessagesDisplayProps {
    messages: Message[];
    userName?: string;
    loading: boolean;
    isHistoryChat?: boolean
    isDesktop?: boolean
}

const MessagesDisplay: React.FC<MessagesDisplayProps> = ({ messages, userName, loading, isHistoryChat, isDesktop }) => (
    <div
        className={`z-10 flex-grow overflow-y-auto 
        ${isHistoryChat ? 
            isDesktop ?
                'max-h-[calc(100dvh-300px)] sm:max-h-[calc(100dvh-300px)]'
                :
                'max-h-[calc(100dvh-250px)] sm:max-h-[calc(100dvh-250px)]'
            :
            'max-h-[calc(100dvh-150px)] sm:max-h-[calc(100dvh-150px)]'
        }`}>
        <div className="flex flex-col w-full gap-6 h-full">
            <div className="text-medium sm:text-lg flex px-2 flex-col gap-2 items-start w-full max-w-[396px] sm:max-w-full">
                {messages.map((m, index) => (
                    <MessageBubble key={index} message={m.message} images={m?.images ? m.images : []} isUser={m.isUser} userName={userName} />
                ))}
            </div>
            {loading && <MessageLoadingIndicator />}
        </div>
    </div>
)

export default MessagesDisplay;
