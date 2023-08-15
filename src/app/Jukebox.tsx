"use client";

import React, { useState, useEffect, useRef } from "react";
import usePartySocket from "partysocket/react";
import ReactPlayer from "react-player";
import ConnectionStatus from "@/app/components/ConnectionStatus";

const host = process.env.NEXT_PUBLIC_PARTYKIT_HOST!;
const protocol =
  host?.startsWith("localhost") || host?.startsWith("127.0.0.1")
    ? "http"
    : "https";

export default function Jukebox() {
  const [player, setPlayer] = useState<ReactPlayer | null>(null);
  const [showPlayer, setShowPlayer] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

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

  useEffect(() => {
    setShowPlayer(true);
  }, []);

  const ensurePlaybackState = (state: "play" | "pause") => {
    if (!player) return;

    if (state === "play") {
      setIsPlaying(true);
    } else if (state === "pause") {
      setIsPlaying(false);
    }
  };

  const onReady = (event: ReactPlayer) => setPlayer(event);
  const onPlay = () => {
    setIsPlaying(true);
    socket.send(JSON.stringify({ type: "playback", state: "play" }));
  };
  const onPause = () => {
    setIsPlaying(false);
    socket.send(JSON.stringify({ type: "playback", state: "pause" }));
  };

  return (
    <div>
      <ConnectionStatus socket={socket} />
      {showPlayer && (
        <ReactPlayer
          url="https://www.youtube.com/watch?v=ydYDqZQpim8"
          muted
          playing={isPlaying}
          onReady={(event) => onReady(event)}
          onPlay={() => onPlay()}
          onPause={() => onPause()}
        />
      )}
    </div>
  );
}
