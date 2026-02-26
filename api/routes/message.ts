import express from "express";
import {Response, Request} from "express";
import messageDb from "../messageDb";


const messagesRouter = express.Router();

messagesRouter.get('/', (req:Request, res:Response) => {
    
});

messagesRouter.post('/', async (req:Request, res:Response) => {
  const{author, message} = req.body;

    if(!message){
      res.status(400).send({error: 'Message invalid'});
    }
    const newMessage = {
        author,
        message,
    }

    const saveMessage = await messageDb.addMessage(newMessage)
    res.send(saveMessage);
})

export default messagesRouter;