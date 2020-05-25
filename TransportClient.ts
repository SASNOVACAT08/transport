import {
  connectWebSocket,
} from "https://deno.land/std/ws/mod.ts";
import { WebSocket } from "https://deno.land/std/ws/mod.ts";

interface Route {
  route: string;
  cb: Function;
}

class TransportClient {
  private webSocket: WebSocket;
  private route: Array<Route>;
  constructor(socket: WebSocket) {
    this.webSocket = socket;
    this.route = [];
    this.start();
  }
  private async start() {
    for await (const ev of this.webSocket) {
      if (typeof ev === "string") {
        let eventObject = JSON.parse(ev);
        let event = this.route.find(
          (data) => data.route === eventObject.route,
        );
        event?.cb(eventObject.data);
      }
    }
  }
  public on(route: string, cb: Function) {
    this.route.push({ route: route, cb: cb });
  }
  public async emit(route: string, data: any) {
    let obj = {
      route: route,
      data: data,
    };
    await this.webSocket.send(JSON.stringify(obj));
  }
}

export async function TransportClientInit(address: string) {
  let conn = await connectWebSocket("ws://" + address);
  return new TransportClient(conn);
}
