import { Transport } from "../transport.ts";

let transport = new Transport(8080, () => {
  console.log("Test");
});
