import type { V2_MetaFunction } from "partymix";
import Jukebox from "~/components/jukebox";
import ConnectionBadge from "~/components/connection-badge";
import Chat from "~/components/chat";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Waterhole" },
    { name: "Waterhole", content: "A shared YouTube space to hang out" },
  ];
};

export default function Index() {
  return (
    <main
      className="relative flex min-h-screen flex-col items-center justify-center p-6 bg-stone-200 font-sans"
      style={{ minHeight: "100dvh" }}
    >
      <h1 className="text-4xl font-semibold pb-6 text-stone-300">Loading...</h1>
      <Jukebox />
      <Chat />
      <ConnectionBadge />
    </main>
  );
}
