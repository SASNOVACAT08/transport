import { Transport, Socket } from "../mod.ts";

const transport = new Transport();

transport.on("connection", (socket: Socket) => {
  socket.on("test", (data: string) => {
    console.log(socket.id);
    console.log(data);
  });
});
