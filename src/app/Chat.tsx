"use client";

import { useState } from "react";
import usePartySocket from "partysocket/react";
import ChatNameForm from "@/app/components/ChatNameForm";
import ChatForm from "./components/ChatForm";

type ChatMessage = {
  name: string;
  message: string;
};

const host = process.env.NEXT_PUBLIC_PARTYKIT_HOST!;
const protocol =
  host?.startsWith("localhost") || host?.startsWith("127.0.0.1")
    ? "http"
    : "https";

export default function Chat() {
  const [name, setName] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const socket = usePartySocket({
    host: host,
    party: "chat",
    room: "shared-jukebox",
    onMessage: (message) => {
      const msg = JSON.parse(message.data as string);
      if (msg.type === "chat") {
        setMessages((prev) => [
          ...prev,
          { name: msg.name, message: msg.message },
        ]);
      }
    },
  });

  const sendMessage = (message: string) => {
    if (!name) return;
    socket?.send(JSON.stringify({ type: "chat", name, message }));
    setMessages((prev) => [...prev, { name: name, message }]);
  };

  return (
    <div className="absolute left-0 bottom-0 w-full sm:w-60 h-60 bg-red-500/50 p-2 flex flex-col justify-end items-start">
      {!name && <ChatNameForm setName={setName} />}
      {name !== null && (
        <>
          <ul className="flex flex-col gap-2">
            {messages.map((msg, i) => (
              <li key={i} className="flex flex-col gap-1">
                <p className="text-xs font-semibold">{msg.name}</p>
                <p className="text-sm">{msg.message}</p>
              </li>
            ))}
          </ul>
          <ChatForm sendMessage={sendMessage} />
        </>
      )}
    </div>
  );
}
