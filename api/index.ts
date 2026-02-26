import express from "express";
import messagesRouter from "./routes/message";
import messageDb from "./messageDb";
import cors from "cors";

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

app.use('/messages', messagesRouter)

const run = async () => {
    await messageDb.init()

    app.listen(port, () => {
        console.log('Server running on port', port);
    })
};

run().catch(err => {
    console.error(err)
})