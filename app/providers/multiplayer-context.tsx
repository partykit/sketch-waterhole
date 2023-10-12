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
  host: string;
  children: React.ReactNode;
}) {
  const socket = usePartySocket({
    host: props.host,
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
