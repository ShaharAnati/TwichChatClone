import React from "react";
import { CircularProgress, TextField } from "@mui/material"

import { ChatRoomMessage, MessagePayload, User } from "./ChatRoomTypes";
import "./ChatRoom.css";
import useChatRoomLogic from "./useChatRoomLogic";

interface ChatRoomScreenProps {
    currentUser: User;
}

const ChatRoom: React.FC<ChatRoomScreenProps> = (props): JSX.Element => {

    const { currentUser } = props;

    const [
        existingMessages,
        usersColors,
        newMessageText,
        setNewMessageText,
        messagesRef,
        socket,
        handleTextfieldKeyPress
    ] = useChatRoomLogic(currentUser);

    const getSingleMessage = (message: MessagePayload): JSX.Element => {
        if (!Object.keys(usersColors).includes(message.user.id)) {
            const newColor = Math.floor(Math.random() * 16777215).toString(16);
            usersColors[message.user.id] = newColor;
        }

        const currentColor = usersColors[message.user.id]

        return (
            <div key={`${message.user.id}${message.messageType}${message.text}`}>
                <span style={{ color: `#${currentColor}` }}>{message.user.name}</span>
                {message.messageType === ChatRoomMessage.userConnect
                    ? <span > connected to the room</span>
                    : message.messageType === ChatRoomMessage.userMessage
                        ? <span>: {message.text}</span>
                        : <span> has disconnected from the room</span>
                }                 
            </div>
        )
    }

    if (!socket) return (
        <CircularProgress />
    )

    return (
        <div className="chatroom-page-container">
            {
                !socket 
                ? <CircularProgress />
                : (
                    <>
                        <div className="title">Welcome to the chat room!</div>
                        <div className="chat-container">
                            <div className="messages-container" ref={messagesRef}>
                                {existingMessages.map(getSingleMessage)}
                            </div>
                            <div className="textfield">
                                <TextField 
                                    id="message" 
                                    name="message"
                                    label="New Message"
                                    fullWidth
                                    size="medium"
                                    variant="outlined"
                                    value={newMessageText}
                                    autoFocus
                                    onChange={(text) => setNewMessageText(text.target.value)}
                                    onKeyDown={(ev) => handleTextfieldKeyPress(ev)}
                                />
                            </div>
                        </div> 
                    </>
                )
            }
        </div>
    )
}

export default ChatRoom;