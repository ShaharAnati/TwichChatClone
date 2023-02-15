import mongoose from "mongoose";
import { MessagePayload } from "../types";


const messagesSchema = new mongoose.Schema({
    user: { id: {type: String}, name: {type: String} },
    messageType: { type: String },
    text: { type: String }
}, {
    timestamps: true
});

const schema: any = mongoose.model("messages", messagesSchema);

export const getAllMessages = async (): Promise<MessagePayload[]> => {
    try {
        const messages = await schema.find().lean();
        return messages;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export default schema;