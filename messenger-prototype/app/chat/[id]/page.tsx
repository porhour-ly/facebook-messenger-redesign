"use client";

import { conversations } from "@/data/conversations";
import ChatView from "@/components/ChatView";
import { useRouter } from "next/navigation";

export default function ChatPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();
  const conversation = conversations.find((c) => c.id === id);

  if (!conversation) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <p className="text-gray-500">Conversation not found</p>
        <button
          onClick={() => router.push("/")}
          className="text-messenger-blue font-semibold"
        >
          Back to inbox
        </button>
      </div>
    );
  }

  return <ChatView conversation={conversation} />;
}
