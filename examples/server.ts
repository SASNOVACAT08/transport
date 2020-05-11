import { Transport } from "../transport.ts";
let transport = new Transport(8080, () => {
  console.log("Test");
});

transport.on("test", (socket: any, msg: any) => {
  console.log(msg);
});
