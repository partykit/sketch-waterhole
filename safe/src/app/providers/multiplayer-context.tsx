"use client";

import { createContext, useContext } from "react";
import PartySocket from "partysocket";
import usePartySocket from "partysocket/react";

interface MultiplayerContextType {
  socket: PartySocket | null;
}

export const MultiplayerContext = createContext<MultiplayerContextType>({
  socket: null,
});

export function useMultiplayer() {
  return useContext(MultiplayerContext);
}

export default function MultiplayerContextProvider(props: {
  children: React.ReactNode;
}) {
  const socket = usePartySocket({
    host: process.env.NEXT_PUBLIC_PARTYKIT_HOST!,
    //party: "youtube-party",
    room: "shared-jukebox",
  });

  return (
    <MultiplayerContext.Provider
      value={{
        socket: socket,
      }}
    >
      {props.children}
    </MultiplayerContext.Provider>
  );
}
