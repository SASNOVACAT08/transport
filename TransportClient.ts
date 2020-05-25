import {
  connectWebSocket,
} from "https://deno.land/std/ws/mod.ts";
import { WebSocket } from "https://deno.land/std/ws/mod.ts";

class TransportClient {
  private socket: WebSocket;
  constructor(socket: WebSocket) {
    this.socket = socket;
  }
  public async emit(route: string, data: any) {
    let obj = {
      route: route,
      data: data,
    };
    await this.socket.send(JSON.stringify(obj));
  }
}

export async function TransportClientInit(address: string) {
  let conn = await connectWebSocket("ws://" + address);
  return new TransportClient(conn);
}
