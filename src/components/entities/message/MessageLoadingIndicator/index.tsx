import React from "react";


const MessageLoadingIndicator = () => {
    return (
        <div className={`flex gap-2 text-center items-center justify-center w-full pb-2 pt-3`}>
            <div className="flex space-x-1 justify-center items-center">
                <div className="w-1.5 h-1.5 bg-[#BEBEBE] animate-scaleUpDown rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-[#BEBEBE] animate-scaleUpDown2 rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-[#BEBEBE] animate-scaleUpDown3 rounded-full"></div>
            </div>
            <p className={'text-[#BEBEBE]'}>Aita is typing</p>
        </div>
    )
}

export default MessageLoadingIndicator;