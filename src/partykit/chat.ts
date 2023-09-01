import type { PartyKitServer } from "partykit/server";

type ChatMessage = {
  type: "chat";
  text: string;
  name: string;
};

export default {
  onMessage(message, websocket, room) {
    const msg = JSON.parse(message as string);
    switch (msg.type) {
      case "chat": {
        room.broadcast(message as string, [websocket.id]);
        break;
      }
    }
  },
} satisfies PartyKitServer;
