import Jukebox from "./Jukebox";
import Chat from "./Chat";

export default function Home() {
  return (
    <main
      className="relative flex min-h-screen flex-col items-center justify-start p-6"
      style={{ minHeight: "100dvh" }}
    >
      <h1 className="text-4xl font-semibold pb-6">YouTube party</h1>
      <Jukebox />
      <Chat />
    </main>
  );
}
