export enum ChatRoomMessage {
    userConnect = "USER_CONNECT",
    userDisconnect = "USER_DISCONNECT",
    userMessage = "USER_MESSAGE"
};

export interface User {
    id: string;
    name: string;
}

export interface MessagePayload {
    messageType: ChatRoomMessage;
    user: User;
    text?: string;
};

export interface UserColors {
    [userId: string]: string;
}