import { Transport } from "../transport.ts";

let transport = new Transport(() => {
  console.log("Test");
});
