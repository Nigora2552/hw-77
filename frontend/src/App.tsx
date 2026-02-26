import './App.css'
import Form from "./components/Form/Form.tsx";
import {useAppDispatch} from "./app/hooks.ts";
import type {MessageMutation} from "./types";
import {addMessage} from "./app/messagesSlice.ts";
import Card from "./components/Card/Card.tsx";

function App() {
    const dispatch = useAppDispatch();

    const onSubmit = async (item: MessageMutation) => {
        await dispatch(addMessage(item))
    }


    return (
        <>
            <Form onSubmit={onSubmit}/>
            <Card/>
        </>
    )
}

export default App
