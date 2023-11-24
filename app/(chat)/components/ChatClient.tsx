"use client";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { useCompletion } from "ai/react";
//Local Imports
import ChatHeader from "@/components/ChatHeader";
import { Companion, Message } from "@prisma/client";
import { ChatForm } from "@/app/api/companion/ChatForm";
import ChatMessages from "@/components/ChatMessages";
import { ChatMessageProps } from "@/components/ChatMessage";

interface ChatClientProps {
  companion: Companion & {
    messages: Message[];
    _count: { messages: number };
  };
}

const ChatClient = ({ companion }: ChatClientProps) => {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessageProps[]>(companion.messages);
  const { input, isLoading, handleInputChange, handleSubmit, setInput } =
    useCompletion({
      api: `/api/chat/${companion.id}`,
      onFinish(prompt, completion) {
        const systemMessage : ChatMessageProps = {
          role: "system",
          content: completion,
        };
        setMessages((current) => [...current, systemMessage]);
        setInput("");

        router.refresh();
      },
    });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    const userMessage  : ChatMessageProps = {
      role: "user",
      content: input,
    };
    console.log(input)
    setMessages((current) => [...current, userMessage]);
    handleSubmit(e);
    setInput("");
    router.refresh();
  };

  return (
    <div className="flex flex-col h-full p-4 spae-y-2">
      <ChatHeader companion={companion} />
      <ChatMessages
        isLoading={isLoading}
        messages={messages}
        companion={companion}
      />
      <ChatForm
        isLoading={isLoading}
        input={input}
        handleInputChange={handleInputChange}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default ChatClient;
