import { serve } from "https://deno.land/std/http/server.ts";
import {
  acceptWebSocket,
  isWebSocketCloseEvent,
  isWebSocketPingEvent,
} from "https://deno.land/std/ws/mod.ts";

interface Route {
  route: String;
  cb: Function;
}

export class Transport {
  private route: Array<Route>;
  constructor(port: number = 8080, cb?: Function) {
    this.route = [];
    if (cb !== undefined) {
      cb();
    }
    this.start(port);
  }
  private async start(port: number) {
    for await (const req of serve({ port: port })) {
      const { conn, r: bufReader, w: bufWriter, headers } = req;
      const sock = await acceptWebSocket({
        conn,
        bufReader,
        bufWriter,
        headers,
      });
      let connection = this.route.find((data) => data.route === "connection");
      if (connection) {
        connection.cb();
      }
      for await (const ev of sock) {
        if (typeof ev === "string") {
          let eventObject = JSON.parse(ev);
          let event = this.route.find(
            (data) => data.route === eventObject.route
          );
          event?.cb(sock, eventObject.data);
        }
      }
    }
  }
  on(route: String, cb: Function) {
    this.route.push({ route: route, cb: cb });
  }
}
