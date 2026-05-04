"use client";

import { Message } from "@/data/conversations";

type MessageBubbleProps = {
  message: Message;
  isOwn: boolean;
  showAnimation?: boolean;
};

export default function MessageBubble({ message, isOwn, showAnimation = false }: MessageBubbleProps) {
  return (
    <div
      className={`flex ${isOwn ? "justify-end" : "justify-start"} ${
        showAnimation ? "animate-bubble-in" : ""
      }`}
    >
      <div
        className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-[15px] leading-relaxed ${
          isOwn
            ? "bg-messenger-blue text-white rounded-br-md"
            : "bg-messenger-gray text-gray-900 rounded-bl-md"
        }`}
      >
        {message.text}
      </div>
    </div>
  );
}
