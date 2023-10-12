import MultiplayerContextProvider from "./providers/multiplayer-context";
import Jukebox from "./Jukebox";
import Chat from "./Chat";
import ConnectionBadge from "./components/ConnectionBadge";

export default function Home() {
  return (
    <main
      className="relative flex min-h-screen flex-col items-center justify-center p-6 bg-stone-200"
      style={{ minHeight: "100dvh" }}
    >
      <h1 className="text-4xl font-semibold pb-6 text-stone-300">Loading...</h1>
      <MultiplayerContextProvider>
        <Jukebox />
        <Chat />
        <ConnectionBadge />
      </MultiplayerContextProvider>
    </main>
  );
}
