import type {IMessages, MessageMutation} from "../types";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosApi from "../axiosApi.ts";
import type {RootState} from "./store.ts";

interface MessagesState {
    items: IMessages[];
    loading: boolean;
}

const initialState: MessagesState = {
    items: [],
    loading: false,
}

export  const messagesSelector = (state: RootState) => state.message.items;
export  const loadingSelector = (state: RootState) => state.message.loading;


export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getMessages.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getMessages.fulfilled, (state,action) => {
            state.loading = false;
            state.items = action.payload
        });
        builder.addCase(getMessages.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(addMessage.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(addMessage.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(addMessage.rejected, (state) => {
            state.loading = false;
        });
    }
})

export const getMessages = createAsyncThunk<IMessages[], void>('message/getMessages',
    async () => {
        const response = await axiosApi.get<IMessages[]>('/messages');
        return response.data || [];
    });

export const addMessage = createAsyncThunk<void, MessageMutation>('message/addMessage',
    async (item) => {
    const formData = new FormData();

    const keys = Object.keys(item) as (keyof MessageMutation)[];

    keys.forEach(key => {
        const value = item[key];
        if(value !== null){
            formData.append(key, value)
        }
    })
    await axiosApi.post('/messages', formData)
    })


export const messagesReducer = messageSlice.reducer;