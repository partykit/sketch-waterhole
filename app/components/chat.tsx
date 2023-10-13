"use client";

import { useState, useEffect } from "react";
import ChatNameInput from "./chat-name-input";
import ChatMessageInput from "./chat-message-input";
import { useMultiplayer } from "~/providers/multiplayer-context";

type ChatMessage = {
  name: string;
  message: string;
};

const MAX_MESSAGES = 10;

export default function Chat() {
  const [name, setName] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const { socket } = useMultiplayer();

  useEffect(() => {
    if (!socket) return;
    const handleMessage = (message: MessageEvent) => {
      const msg = JSON.parse(message.data as string);
      if (msg.type === "chat") {
        recordMessage(msg.name, msg.message);
      }
    };
    socket.addEventListener("message", handleMessage);
    return () => {
      socket.removeEventListener("message", handleMessage);
    };
  }, [socket]);

  const sendMessage = (message: string) => {
    if (!name) return;
    socket?.send(JSON.stringify({ type: "chat", name, message }));
    recordMessage(name, message);
  };

  const recordMessage = (name: string, message: string) => {
    const newMessages = [...messages, { name, message }];
    // Truncate the array to the last 10 messages
    setMessages((prevMessages) => {
      return [...prevMessages, { name, message }].slice(-MAX_MESSAGES);
    });
  };

  return (
    <div className="absolute left-0 bottom-0 w-full sm:w-96 h-80 p-1 sm:p-2 flex flex-col justify-end items-start">
      {!name && <ChatNameInput setName={setName} />}
      <div
        className={`w-full flex flex-col gap-4 ${
          name === null ? "blur-sm" : ""
        }`}
      >
        <ul className="flex flex-col gap-1 items-start">
          {messages.map((msg, i) => {
            const message_age = MAX_MESSAGES - (messages.length - i);
            let opacity = "";
            if (message_age === 1) opacity = "opacity-25";
            else if (message_age === 2) {
              opacity = "opacity-75";
            } else if (message_age < 1) {
              opacity = "opacity-0";
            }
            return (
              <li
                key={i}
                className={`font-mono text-sm flex flex-row gap-3 px-2 py-1 bg-white/90 justify-start items-baseline ${opacity}`}
              >
                <span className="text-black/40">{msg.name}</span>
                <span className="text-black">{msg.message}</span>
              </li>
            );
          })}
        </ul>
        <div className={name === null ? "opacity-0" : ""}>
          <ChatMessageInput
            sendMessage={sendMessage}
            disabled={name === null}
          />
        </div>
      </div>
    </div>
  );
}
