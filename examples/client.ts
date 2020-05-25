import { TransportClient } from "../mod.ts";

const transport = await TransportClient("127.0.0.1:8080");

transport.emit("test", "Hello World !");
