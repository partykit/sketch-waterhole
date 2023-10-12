import { useLoaderData } from "@remix-run/react";
import type { V2_MetaFunction } from "partymix";
import WhosHere from "../components/whos-here";
//import Jukebox from "~/components/jukebox";
import Video from "~/components/video-example";

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
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      {/* 
      Oh no, this is causing an error!

      Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: object.
      */}
      <Video />
      <WhosHere host={partykitHost} />
    </div>
  );
}
