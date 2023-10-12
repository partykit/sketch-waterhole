"use client";

import { useEffect, useState } from "react";
import PartySocket from "partysocket";

const readyStates = {
  [PartySocket.CONNECTING]: {
    text: "Connecting",
    className: "bg-yellow-500",
  },
  [PartySocket.OPEN]: {
    text: "Connected",
    className: "bg-green-500",
  },
  [PartySocket.CLOSING]: {
    text: "Closing",
    className: "bg-orange-500",
  },
  [PartySocket.CLOSED]: {
    text: "Not Connected",
    className: "bg-red-500",
  },
};

export default function ConnectionStatus(props: {
  socket: PartySocket | WebSocket | null;
  connections?: number;
}) {
  const { socket, connections } = props;
  const [readyState, setReadyState] = useState<number>(
    socket?.readyState === 1 ? 1 : 0
  );
  const display = readyStates[readyState as keyof typeof readyStates];

  useEffect(() => {
    if (socket) {
      const onStateChange = () => {
        setReadyState(socket.readyState);
      };

      socket.addEventListener("open", onStateChange);
      socket.addEventListener("close", onStateChange);

      return () => {
        socket.removeEventListener("open", onStateChange);
        socket.removeEventListener("close", onStateChange);
      };
    }
  }, [socket]);

  let badge = display.text;
  if (connections && connections > 0 && readyState === PartySocket.OPEN) {
    badge = `${connections} here`;
  }

  return (
    <div className="z-20 fixed bottom-2 right-2 flex justify-end">
      <div className="flex gap-1 sm:gap-2 justify-center items-center bg-stone-50 rounded-full shadow-md border border-stone-300 pl-2 sm:pl-3 pr-1 sm:pr-2 py-1 sm:py-2">
        <p className="text-xs font-base uppercase tracking-wider leading-none text-stone-500">
          {badge}
        </p>
        <div className={`w-3 h-3 rounded-full ${display.className}`}></div>
      </div>
    </div>
  );
}
