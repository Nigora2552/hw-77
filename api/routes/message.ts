import express from "express";
import {Response, Request} from "express";
import messageDb from "../messageDb";
import {imagesUpload} from "../multer";


const messagesRouter = express.Router();

messagesRouter.get('/', async (req: Request, res: Response) => {
    const messages = await messageDb.getMessage();
    res.send(messages);
});

messagesRouter.post('/', imagesUpload.single('image'), async (req: Request, res: Response) => {
    const {author, message} = req.body;

    if (!message) {
        res.status(400).send({error: 'Message invalid'});
    }
    const newMessage = {
        author: author || 'Anonymous',
        message,
        image: req.file ? 'images/' + req.file.filename : null,
    }

    const saveMessage = await messageDb.addMessage(newMessage)
    res.send(saveMessage);
})

export default messagesRouter;