import express from "express";
import * as bodyParser from "body-parser";
import { Server } from "socket.io";

import BuildResourceRouter from "./routers/ResourcesRouter";
import { ChatRoomMessage, MessagePayload } from "./types";
import { connectToDatabase } from "./database/DatabaseEndpoint";
import messagesModel, { getAllMessages } from "./database/ChatRoomSchema";

const app: express.Application = express();

const httpServer = app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
  });

const io = new Server(httpServer);

io.on("connection", (socket) => {
  socket.on("connectToRoom", async (data) => {
    const { user } = data;

    await messagesModel.create({
      user,
      messageType: ChatRoomMessage.userConnect
    });

    console.log("Created new message in database");

    socket.emit("initialData", await getAllMessages() as MessagePayload[]);

    socket.broadcast.emit("newMessage", {user, messageType: ChatRoomMessage.userConnect})
  })

  socket.on("messageReceived", async (data) => {
    const { user, text } = data;

    const message: MessagePayload = {
      user,
      messageType: ChatRoomMessage.userMessage,
      text
    }

    await messagesModel.create(message);
    
    socket.broadcast.emit("newMessage", message)
  })

})

const init = async (): Promise<void> => {
  await connectToDatabase();
  messagesModel.deleteMany();
  
  app.use(bodyParser.json());
  app.use(BuildResourceRouter());
}

init();