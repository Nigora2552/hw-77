import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useEffect} from "react";
import {getMessages, loadingSelector, messagesSelector} from "../../app/messagesSlice.ts";
import {CircularProgress, Paper} from "@mui/material";


const Card = () => {
    const dispatch = useAppDispatch();
    const messages = useAppSelector(messagesSelector);
    const loading = useAppSelector(loadingSelector);

    useEffect(() => {
        dispatch(getMessages())
    }, [dispatch])


    return (
        <>
            {loading && <CircularProgress/>}
            {!loading && messages.length === 0 && <p>No message</p>}
            {!loading && messages.length > 0 &&
                messages.map(msg => (
                    <Paper key={msg.id} sx={{padding: '10px 20px', marginY: '15px'}}>
                        <h4>{msg.author}</h4>
                        <p>{msg.message}</p>
                        {msg.image ? <img src={msg.image} alt=''/> : <p>No photo</p>  }
                    </Paper>
                ))}
        </>
    );
};

export default Card;