import {IMessage, MessageMutation} from "./types";
import {promises as fs} from "fs";
import crypto from "crypto";

const fileName = './message.json';

let data: IMessage[] = [];


const messageDb = {
    async init() {
        try {
            const messageContents = await fs.readFile(fileName);
            data = JSON.parse(messageContents.toString());
        } catch (e) {
            data = [];
        }
    },
    async getMessage() {
        return data;
    },
    async addMessage(item: MessageMutation) {
        const id = crypto.randomUUID();
        const newMessage = {id, ...item};
        data.push(newMessage);
        await this.save();
        return newMessage;
    },
    async save() {
        return fs.writeFile(fileName, JSON.stringify(data))
    }
}

export default messageDb;