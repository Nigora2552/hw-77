import {Button, CircularProgress, Container, Grid, TextField} from "@mui/material";
import React, {useState} from "react";
import FileInput from "../UI/FileInput/FileInput.tsx";
import type {MessageMutation} from "../../types";

interface Props {
    onSubmit: (item: MessageMutation) => void;
    loading?: boolean;
}

const Form: React.FC<Props> = ({onSubmit,loading}) => {
    const [form, setForm] = useState<MessageMutation>({
        author: '',
        message: '',
        image: null,
    });

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setForm(prevState => ({
            ...prevState,
            [name]: value
        }))
    };

    const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, files} = e.target;
        if(files){
            setForm(prevState => ({
                ...prevState,
                [name]: files[0]
            }))
        }
    };

    const SubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        onSubmit(form)
    };


    return (
        <Container>
            <form onSubmit={SubmitForm}>
                <Grid spacing={2}>
                    <Grid margin='15px 0'>
                        <TextField
                            fullWidth
                            id="author"
                            label="Author"
                            variant="outlined"
                            name='author'
                            value={form.author}
                            onChange={onInputChange}
                        />
                    </Grid>
                    <Grid margin='15px 0'>
                        <TextField
                            fullWidth
                            id="message"
                            label="Message"
                            variant="outlined"
                            name='message'
                            value={form.message}
                            onChange={onInputChange}
                        /></Grid>
                    <Grid margin='15px 0'>
                        <FileInput
                            label='image'
                            name='image'
                            onChange={fileInputChangeHandler}
                        />
                    </Grid>
                </Grid>
                <Button disabled={loading} type='submit' variant="outlined"> Add</Button>
                {loading && <CircularProgress/>}
            </form>
        </Container>
    );
};

export default Form;