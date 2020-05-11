import { serve } from "https://deno.land/std/http/server.ts";
import {
  acceptWebSocket,
  isWebSocketCloseEvent,
  isWebSocketPingEvent,
} from "https://deno.land/std/ws/mod.ts";

export class Transport {
  constructor(cb?: Function) {
    if (cb !== undefined) {
      cb();
    }
  }
}
