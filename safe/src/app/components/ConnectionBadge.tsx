"use client";

import { useState, useEffect } from "react";
import { useMultiplayer } from "@/app/providers/multiplayer-context";
import ConnectionStatus from "./ConnectionStatus";

export default function ConnectionBadge() {
  const [connections, setConnections] = useState(0);
  const { socket } = useMultiplayer();

  useEffect(() => {
    if (!socket) return;
    const handleMessage = (message: MessageEvent) => {
      const msg = JSON.parse(message.data as string);
      if (msg.type === "connections") {
        setConnections(msg.count);
      }
    };
    socket.addEventListener("message", handleMessage);
    return () => {
      socket.removeEventListener("message", handleMessage);
    };
  }, [socket]);

  return <ConnectionStatus socket={socket} connections={connections} />;
}
