import { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { ChatRoomMessage, MessagePayload, User, UserColors } from './ChatRoomTypes';

let socket;

const useChatRoomLogic = (currentUser: User) => {
    const [existingMessages, setExistingMessages] = useState<MessagePayload[]>();
    const [usersColors, setUsersColors] = useState<UserColors>({});
    const [newMessageText, setNewMessageText] = useState<string>('');
    const messagesRef = useRef<HTMLDivElement>(null);

    function initWebsocket() {
        socket = io();
        socket.emit("connectToRoom", { user: currentUser });

        socket.on("initialData", (data: MessagePayload[]) => {
            console.log("received initial data")
            setExistingMessages(data);
        })

        socket.on("newMessage", (data: MessagePayload) => {
            setExistingMessages(prevMessages => [...prevMessages, data]);
        })

        return socket;
    }

    useEffect(() => {
        const socket = initWebsocket();
        return () => socket.disconnect();
    }, [])

    useEffect(() => {
        if (messagesRef.current) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
     })

     const handleSubmitMessage = () => {
        const newMessage: MessagePayload = {
            user: currentUser,
            messageType: ChatRoomMessage.userMessage,
            text: newMessageText
        }

        setExistingMessages(prevMessages => [...prevMessages, newMessage]);
        socket.emit('newMessage', newMessage);
        
        setNewMessageText('');
    }

    const handleTextfieldKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') {
            handleSubmitMessage();
            event.preventDefault();
        }
    }

    return [
        existingMessages,
        usersColors,
        newMessageText,
        setNewMessageText,
        messagesRef,
        socket,
        handleTextfieldKeyPress
    ];
}

export default useChatRoomLogic;