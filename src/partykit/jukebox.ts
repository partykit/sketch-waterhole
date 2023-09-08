import type { Party, PartyKitServer, Connection } from "partykit/server";

type PlaybackMessage = {
  type: "playback";
  state: "play" | "pause";
};

type ChatMessage = {
  type: "chat";
  text: string;
  name: string;
};

type ConnectionsMessage = {
  type: "connections";
  count: number;
};

export default class Jukebox implements PartyKitServer {
  constructor(public party: Party) {}

  onConnect(connection: Connection) {
    this.broadcastConnections();
  }
  onClose(connection: Connection) {
    this.broadcastConnections();
  }
  onMessage(message: string | ArrayBuffer, connection: Connection) {
    const msg = JSON.parse(message as string);
    switch (msg.type) {
      case "playback": {
        this.party.broadcast(message as string);
        break;
      }
      case "chat": {
        this.party.broadcast(message as string, [connection.id]);
        break;
      }
    }
  }
  broadcastConnections() {
    this.party.broadcast(
      JSON.stringify({
        type: "connections",
        count: Array.from(this.party.getConnections()).length,
      })
    );
  }
}
