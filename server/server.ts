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
const chatroomUserSocketIds = new Map();

io.on("connection", (socket) => {
  socket.on("connectToRoom", async (data) => {
    const { user } = data;

    chatroomUserSocketIds.set(socket.id, { user });

    await messagesModel.create({
      user,
      messageType: ChatRoomMessage.userConnect
    });

    socket.emit("initialData", await getAllMessages() as MessagePayload[]);

    socket.broadcast.emit("newMessage", {user, messageType: ChatRoomMessage.userConnect})
  })

  socket.on("newMessage", async (data) => {
    const { user, text } = data;

    const message: MessagePayload = {
      user,
      messageType: ChatRoomMessage.userMessage,
      text
    }

    await messagesModel.create(message);
    
    socket.broadcast.emit("newMessage", message)
  })

  socket.on("disconnect", async () => {
    if (chatroomUserSocketIds.has(socket.id)) {
      const { user } = chatroomUserSocketIds.get(socket.id);

      chatroomUserSocketIds.delete(socket.id);

      const newMessage: MessagePayload = {
        user,
        messageType: ChatRoomMessage.userDisconnect
      }
      socket.broadcast.emit("newMessage", newMessage);
    }

    console.log("disconnected");
  });

  io.emit("connected");
})

const init = async (): Promise<void> => {
  await connectToDatabase();
  await messagesModel.deleteMany({});
  
  app.use(bodyParser.json());
  app.use(BuildResourceRouter());
}

init();