import { useLoaderData } from "@remix-run/react";
import type { V2_MetaFunction } from "partymix";
import WhosHere from "../components/whos-here";
import Jukebox from "../components/jukebox";

// PartyKit will inject the host into the server bundle
// so let's read it here and expose it to the client
declare const PARTYKIT_HOST: string;
export function loader() {
  return { partykitHost: PARTYKIT_HOST };
}

export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Partymix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const { partykitHost } = useLoaderData<typeof loader>();

  return (
    <main
      className="relative flex min-h-screen flex-col items-center justify-center p-6 bg-stone-200 font-sans"
      style={{ minHeight: "100dvh" }}
    >
      <h1 className="text-4xl font-semibold pb-6 text-stone-300">Loading...</h1>
      <Jukebox />
      <WhosHere host={partykitHost} />
    </main>
  );
}
