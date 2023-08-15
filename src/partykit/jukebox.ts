import type { PartyKitServer, PartyKitRoom } from "partykit/server";

type PlaybackMessage = {
  type: "playback";
  state: "play" | "pause";
};

export default {
  onMessage(message, websocket, room) {
    const msg = JSON.parse(message as string);
    switch (msg.type) {
      case "playback": {
        room.broadcast(message as string);
        break;
      }
    }
  },
} satisfies PartyKitServer;
