import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useEffect} from "react";
import {getMessages, messagesSelector} from "../../app/messagesSlice.ts";
import { Paper} from "@mui/material";


const Card = () => {
    const dispatch = useAppDispatch();
    const messages = useAppSelector(messagesSelector);


    useEffect(() => {
        dispatch(getMessages())
        const interval = setInterval(() => {dispatch(getMessages())}, 5000)
        return () => clearInterval(interval)
    }, [dispatch])


    return (
        <>
            {messages.length > 0 &&
                messages.map(msg => (
                    <Paper key={msg.id} sx={{padding: '10px 20px', marginY: '15px'}}>
                        <h4>{msg.author}</h4>
                        <p>{msg.message}</p>
                        {msg.image ? <img width='50%' height='100%' src={msg.image} alt=''/> : <p>No photo</p>}
                    </Paper>
                ))}
        </>
    );
};

export default Card;