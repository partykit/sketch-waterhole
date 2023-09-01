"use client";

import React, { useState, useEffect } from "react";
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
  const [windowDimensions, setWindowDimensions] = useState({
    width: 1600,
    height: 900,
  });
  const [playerIsVertical, setPlayerIsVertical] = useState(false);
  const ASPECT_RATIO = 16 / 9;

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
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const isVertical =
      windowDimensions.width / windowDimensions.height < ASPECT_RATIO;
    setPlayerIsVertical(isVertical);
  }, [windowDimensions]);

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

  // Namibia https://www.youtube.com/watch?v=ydYDqZQpim8
  // Lofi beats https://www.youtube.com/watch?v=jfKfPfyJRdk

  const playerDimensions = {
    width: playerIsVertical
      ? windowDimensions.height * ASPECT_RATIO
      : windowDimensions.width,
    height: playerIsVertical
      ? windowDimensions.height
      : windowDimensions.width / ASPECT_RATIO,
  };

  return (
    <div>
      <ConnectionStatus socket={socket} />
      {showPlayer && (
        <div
          className="fixed top-0"
          style={{
            marginTop: playerIsVertical
              ? "0"
              : `-${(playerDimensions.height - windowDimensions.height) / 2}px`,
            marginLeft: `-${playerDimensions.width / 2}px`,
          }}
        >
          <div className="absolute top-0 left-0 right-0 bottom-0 w-screen h-screen">
            <ReactPlayer
              url="https://www.youtube.com/watch?v=ydYDqZQpim8"
              muted
              playing={isPlaying}
              onReady={(event) => onReady(event)}
              onPlay={() => onPlay()}
              onPause={() => onPause()}
              width={`${playerDimensions.width}px`}
              height={`${playerDimensions.height}px`}
            />
          </div>
        </div>
      )}
    </div>
  );
}
