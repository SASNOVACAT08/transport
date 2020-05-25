import { WebSocket } from "https://deno.land/std/ws/mod.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";

interface Route {
  route: string;
  cb: Function;
}

export class Socket {
  private webSocket: WebSocket;
  private route: Array<Route>;
  public id: string;
  constructor(socket: WebSocket) {
    this.webSocket = socket;
    this.route = [];
    this.id = v4.generate();
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
