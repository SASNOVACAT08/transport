import { Transport } from "../transport.ts";
import { Socket } from "../Socket.ts";

const transport = new Transport();

transport.on("connection", (socket: Socket) => {
  socket.on("test", (data: string) => {
    console.log(socket.id);
    console.log(data);
  });
});
