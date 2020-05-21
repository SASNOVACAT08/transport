import { TransportClient } from "../TransportClient.ts";

const transport = new TransportClient("127.0.0.1:8080");

transport.emit("test", "Hello World !");
