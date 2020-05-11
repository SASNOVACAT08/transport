import { serve } from "https://deno.land/std/http/server.ts";
import {
  acceptWebSocket,
  isWebSocketCloseEvent,
  isWebSocketPingEvent,
} from "https://deno.land/std/ws/mod.ts";

interface Route {
  name: String;
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
    }
  }
  on(route: String, cb: Function) {
    this.route.push({ name: route, cb: cb });
  }
}
