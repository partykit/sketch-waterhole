"use client";

import { useState, useEffect, useRef } from "react";
import usePartySocket from "partysocket/react";
import YouTube, { YouTubeProps, YouTubePlayer } from "react-youtube";
import ConnectionStatus from "@/app/components/ConnectionStatus";

const host = process.env.NEXT_PUBLIC_PARTYKIT_HOST!;
const protocol =
  host?.startsWith("localhost") || host?.startsWith("127.0.0.1")
    ? "http"
    : "https";

export default function Jukebox() {
  const [player, setPlayer] = useState<YouTubePlayer | null>(null);

  const socket = usePartySocket({
    host: host,
    //party: "youtube-party",
    room: "shared-jukebox",
    onMessage: (message) => {
      const msg = JSON.parse(message.data as string);
      if (msg.type === "playback") {
        ensurePlaybackState(msg.state);
      }
    },
  });

  const ensurePlaybackState = (state: "play" | "pause") => {
    if (!player) return;

    if (state === "play") {
      player.playVideo();
    } else if (state === "pause") {
      player.pauseVideo();
    }
  };

  const opts: YouTubeProps["opts"] = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  const onReady = (event: { target: YouTubePlayer }) => {
    setPlayer(event.target);
  };

  return (
    <div>
      <ConnectionStatus socket={socket} />
      <YouTube
        videoId="ydYDqZQpim8"
        opts={opts}
        onReady={(event) => onReady(event)}
        onPlay={() =>
          socket.send(JSON.stringify({ type: "playback", state: "play" }))
        }
        onPause={() =>
          socket.send(JSON.stringify({ type: "playback", state: "pause" }))
        }
      />
    </div>
  );
}
