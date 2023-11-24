"use client";
//Global Imports
import { Companion } from "@prisma/client";
import { useState, useEffect, useRef, ElementRef } from "react";
//Local Imports
import ChatMessage from "./ChatMessage";
import { ChatMessageProps } from "@/components/ChatMessage";

interface ChatMessagesProps {
  messages: ChatMessageProps[];
  isLoading: boolean;
  companion: Companion;
}

const ChatMessages = ({
  messages = [],
  isLoading,
  companion,
}: ChatMessagesProps) => {
  const [isFakeLoading, setIsFakeLoading] = useState(
    messages.length === 0 ? true : false
  );

  const scrollRef = useRef<ElementRef<"div">>(null);

  useEffect(()=>{
    scrollRef.current?.scrollIntoView({behavior : "smooth"});
  } , []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsFakeLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="flex-1 overflow-y-auto pr-4">
      <ChatMessage
        isLoading={isFakeLoading}
        src={companion.src}
        role="system"
        content={`Hello, I am ${companion.name}, ${companion.description}`}
      />
      {messages.map((singleMessage) => {
        return (
          <ChatMessage
            key={singleMessage.content}
            role={singleMessage.role}
            src={singleMessage.role}
            content={singleMessage.content}
          />
        );
      })}
      {isLoading && <ChatMessage role="system" src={companion.src} isLoading />}
      <div ref={scrollRef}></div>
    </div>
  );
};

export default ChatMessages;
