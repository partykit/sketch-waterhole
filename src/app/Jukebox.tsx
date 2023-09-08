"use client";

import React, { useState, useEffect, useLayoutEffect } from "react";
import ReactPlayer from "react-player";
import { useMultiplayer } from "@/app/providers/multiplayer-context";

export default function Jukebox() {
  const [player, setPlayer] = useState<ReactPlayer | null>(null);
  const [showPlayer, setShowPlayer] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const { socket } = useMultiplayer();

  useEffect(() => {
    if (!socket) return;
    const handleMessage = (message: MessageEvent) => {
      const msg = JSON.parse(message.data as string);
      if (msg.type === "playback") {
        ensurePlaybackState(msg.state);
      }
    };
    socket.addEventListener("message", handleMessage);
    return () => {
      socket.removeEventListener("message", handleMessage);
    };
  }, [socket]);

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
    socket && socket.send(JSON.stringify({ type: "playback", state: "play" }));
  };
  const onPause = () => {
    setIsPlaying(false);
    socket && socket.send(JSON.stringify({ type: "playback", state: "pause" }));
  };

  /* LAYOUT CALCULATIONS START */

  const [windowDimensions, setWindowDimensions] = useState({
    width: 1600,
    height: 900,
  });
  const [playerIsVertical, setPlayerIsVertical] = useState(false);
  const ASPECT_RATIO = 16 / 9;

  useLayoutEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      setPlayerIsVertical(
        window.innerWidth / window.innerHeight < ASPECT_RATIO
      );
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [ASPECT_RATIO]);

  const playerDimensions = {
    width: playerIsVertical
      ? windowDimensions.height * ASPECT_RATIO
      : windowDimensions.width,
    height: playerIsVertical
      ? windowDimensions.height
      : windowDimensions.width / ASPECT_RATIO,
  };

  const containerStyle = {
    marginTop: playerIsVertical
      ? "0"
      : `-${(playerDimensions.height - windowDimensions.height) / 2}px`,
    marginLeft: `-${playerDimensions.width / 2}px`,
  };

  /* LAYOUT CALCULATIONS END */

  // Namibia https://www.youtube.com/watch?v=ydYDqZQpim8
  // Lofi beats https://www.youtube.com/watch?v=jfKfPfyJRdk

  // pointer-events-none on the player container prevents the users from play/pausing

  return (
    <div>
      {showPlayer && (
        <>
          <div className="fixed top-0" style={containerStyle}>
            <div className="absolute top-0 left-0 right-0 bottom-0 w-screen h-screen pointer-events-none">
              <ReactPlayer
                url="https://www.youtube.com/watch?v=ydYDqZQpim8"
                muted={isMuted}
                playing={isPlaying}
                onReady={(event) => onReady(event)}
                onPlay={() => onPlay()}
                onPause={() => onPause()}
                width={`${playerDimensions.width}px`}
                height={`${playerDimensions.height}px`}
              />
            </div>
          </div>
          {isMuted && (
            <button
              className="absolute top-2 left-2 bg-red-400 hover:bg-red-500 text-white font-4xl z-10 px-1 cursor-pointer"
              onClick={() => setIsMuted(false)}
            >
              Muted!
              <br />
              <span className="underline">Tap to enable sound</span>
            </button>
          )}
        </>
      )}
    </div>
  );
}
