import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useEffect} from "react";
import {getMessages, messagesSelector} from "../../app/messagesSlice.ts";
import {Grid, Paper} from "@mui/material";
import CardItem from "./CardItem.tsx";


const Card = () => {
    const dispatch = useAppDispatch();
    const messages = useAppSelector(messagesSelector);


    useEffect(() => {
        dispatch(getMessages())
        const interval = setInterval(() => {
            dispatch(getMessages())
        }, 5000)
        return () => clearInterval(interval)
    }, [dispatch])


    return (
        <Grid size={{xs: 12, sm: 12, md: 6, lg: 6}} sx={{display: 'flex' , flexWrap: 'wrap'}}>
            {messages.length > 0 &&
                messages.map(msg => (
                    <Paper key={msg.id} sx={{padding: '10px 20px', margin: '15px', width: '150px',display: 'flex',
                    flexDirection: 'column'}}>
                        <CardItem  image={msg.image ? msg.image : ''} message={msg.message} author={msg.author}/>
                    </Paper>
                ))}
        </Grid>
    );
};

export default Card;