"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Conversation, Message, autoReplies } from "@/data/conversations";
import MessageBubble from "./MessageBubble";

type ChatViewProps = {
  conversation: Conversation;
};

const avatarColors = [
  "bg-blue-500",
  "bg-green-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-orange-500",
  "bg-teal-500",
  "bg-indigo-500",
  "bg-red-500",
];

function getAvatarColor(id: string) {
  const index = parseInt(id.replace(/\D/g, "")) % avatarColors.length;
  return avatarColors[index];
}

export default function ChatView({ conversation }: ChatViewProps) {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>(conversation.messages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [newMessageIds, setNewMessageIds] = useState<Set<string>>(new Set());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const replyIndexRef = useRef(0);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  const sendMessage = () => {
    if (!inputValue.trim()) return;

    const newMsg: Message = {
      id: `user-${Date.now()}`,
      senderId: "me",
      text: inputValue.trim(),
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, newMsg]);
    setNewMessageIds((prev) => new Set(prev).add(newMsg.id));
    setInputValue("");

    // Auto-reply after 1-2 seconds
    setTimeout(() => {
      setIsTyping(true);
    }, 500);

    setTimeout(() => {
      setIsTyping(false);
      const replies = autoReplies[conversation.id] || ["Got it!", "Thanks!", "Sounds good!"];
      const replyText = replies[replyIndexRef.current % replies.length];
      replyIndexRef.current++;

      const replyMsg: Message = {
        id: `reply-${Date.now()}`,
        senderId: conversation.participants[0].id,
        text: replyText,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, replyMsg]);
      setNewMessageIds((prev) => new Set(prev).add(replyMsg.id));
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const participant = conversation.participants[0];
  const colorClass = getAvatarColor(participant.id);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-messenger-border px-3 py-2.5 flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="w-9 h-9 rounded-full hover:bg-messenger-gray flex items-center justify-center transition-colors"
        >
          <svg className="w-6 h-6 text-messenger-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="relative flex-shrink-0">
          <div
            className={`w-10 h-10 rounded-full ${colorClass} flex items-center justify-center text-white font-bold text-sm`}
          >
            {participant.avatar}
          </div>
          {participant.isOnline && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-[15px] font-semibold text-gray-900 truncate">{participant.name}</h2>
          <p className="text-xs text-gray-500">
            {participant.isOnline ? "Active now" : "Last active recently"}
          </p>
        </div>
        <div className="flex gap-1">
          <button className="w-9 h-9 rounded-full hover:bg-messenger-gray flex items-center justify-center">
            <svg className="w-5 h-5 text-messenger-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </button>
          <button className="w-9 h-9 rounded-full hover:bg-messenger-gray flex items-center justify-center">
            <svg className="w-5 h-5 text-messenger-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-2">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            isOwn={message.senderId === "me"}
            showAnimation={newMessageIds.has(message.id)}
          />
        ))}
        {isTyping && (
          <div className="flex justify-start animate-fade-in">
            <div className="bg-messenger-gray px-4 py-3 rounded-2xl rounded-bl-md">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="sticky bottom-0 bg-white border-t border-messenger-border px-3 py-2.5">
        <div className="flex items-center gap-2">
          <button className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-messenger-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Aa"
              className="w-full px-4 py-2.5 bg-messenger-gray rounded-full text-[15px] outline-none focus:ring-2 focus:ring-messenger-blue/20 placeholder:text-gray-500"
            />
          </div>
          {inputValue.trim() ? (
            <button
              onClick={sendMessage}
              className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-transform active:scale-90"
            >
              <svg className="w-6 h-6 text-messenger-blue" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          ) : (
            <button className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-messenger-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
