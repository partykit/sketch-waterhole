import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { useMultiplayer } from "~/providers/multiplayer-context";
import UnmuteButton from "./jukebox-unmute-button";
import AboutButton from "./about-button";
import AboutModal from "./about-modal";

// @ts-ignore bundling issue with react-player
const Player = ReactPlayer.default as typeof ReactPlayer;

export default function Jukebox() {
  const [player, setPlayer] = useState<ReactPlayer | null>(null);
  const [showPlayer, setShowPlayer] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showAbout, setShowAbout] = useState(false);
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

  useEffect(() => {
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

  if (!showPlayer) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="fixed top-0" style={containerStyle}>
        <div className="absolute top-0 left-0 right-0 bottom-0 w-screen h-screen pointer-events-none">
          <Player
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
      <div className="absolute z-10 top-2 left-2 flex flex-col gap-2 justify-start items-start">
        {isMuted && <UnmuteButton unmute={() => setIsMuted(false)} />}
        <AboutButton showAbout={showAbout} setShowAbout={setShowAbout} />
      </div>
      {showAbout && (
        <AboutModal showAbout={showAbout} setShowAbout={setShowAbout} />
      )}
    </div>
  );
}
