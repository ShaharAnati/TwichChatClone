import React from "react";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { CircularProgress } from "@mui/material"

import { MessagePayload, User } from "./ChatRoomTypes";
import "./ChatRoom.css";

let socket;

interface ChatRoomScreenProps {
    currentUser: User;
}

const ChatRoom: React.FC<ChatRoomScreenProps> = (props): JSX.Element => {

    const { currentUser } = props;
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [existingMessages, setExistingMessages] = useState<MessagePayload[]>();

    function initWebsocket() {
        socket = io();
        socket.emit("connectToRoom", {user: currentUser});

        socket.on("initialData", (data: MessagePayload[]) => {
            console.log("received initial data")
            setIsLoading(false);
            setExistingMessages(data);
        })

        return socket;
    }

    useEffect(() => {       
        const socket = initWebsocket();
        return () => socket.disconnect();
    }, [])

    return (
        <div className="page-container">
            {
                isLoading ? <CircularProgress /> : <div>Welcome to the chat room {currentUser.name}!</div>
            }
        </div>
    )
}

export default ChatRoom;