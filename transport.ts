import { serve } from "https://deno.land/std/http/server.ts";
import {
  acceptWebSocket,
  isWebSocketCloseEvent,
  isWebSocketPingEvent,
} from "https://deno.land/std/ws/mod.ts";
import { Socket } from "./Socket.ts";

export class Transport {
  private sockets: Array<Socket>;
  private port: number;
  constructor(port: number = 8080) {
    this.sockets = [];
    this.port = port;
  }
  public async on(route: string, cb: Function) {
    if (route === "connection") {
      for await (const req of serve({ port: this.port })) {
        const { conn, r: bufReader, w: bufWriter, headers } = req;
        const sock = await acceptWebSocket({
          conn,
          bufReader,
          bufWriter,
          headers,
        });
        const socket = new Socket(sock);
        this.sockets.push(socket);
        cb(socket);
      }
    }
  }
}
