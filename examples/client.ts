import { TransportClient } from "../mod.ts";

const transport = await TransportClient("127.0.0.1:8080");

transport.on("RES_TEST", (data: string) => {
  console.log(data);
});

transport.emit("test", "Hello World !");
