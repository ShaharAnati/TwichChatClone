import express from "express";
import * as bodyParser from "body-parser";
import { Server } from "socket.io";

import BuildResourceRouter from "./routers/ResourcesRouter";
import { ChatRoomMessage, MessagePayload } from "./types";

const app: express.Application = express();

const httpServer = app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
  });

const io = new Server(httpServer);

io.on("connection", (socket) => {
  socket.on("connectToRoom", async (data) => {
    const { user: {id, name} } = data;

    socket.emit("initialData", [
      {messageType: ChatRoomMessage.userConnect, user: {id: "123", name: "Shahar"}}, 
      {messageType: ChatRoomMessage.userMessage, user: {id: "456", name: "Shahar"}, text: "Whats up"}
    ] as MessagePayload[])
  })

})

const init = async (): Promise<void> => {
  app.use(bodyParser.json());
  app.use(BuildResourceRouter());
}

init();