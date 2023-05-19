import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    idInstance: "",
    apiTokenInstance: "",
    contacts: [],
    logged: false,
    messages: {}
};

export const masterSlice = createSlice({
    name: 'master',
    initialState,
    reducers: {
        setIdInstance: (state, action) => {
            state.idInstance = action.payload;
        },
        setApiTokenInstance: (state, action) => {
            state.apiTokenInstance = action.payload;
        },
        setContacts: (state, action) => {
            state.contacts = action.payload;
        },
        setLogged: (state, action) => {
            state.logged = action.payload
        },
        setMessages: (state, action) => {
            state.messages[action.payload.chatId] = action.payload.chat;
            console.log(action.payload);
        }
    }
}
);


export const {
    setIdInstance,
    setApiTokenInstance,
    setContacts,
    setLogged,
    setMessages } = masterSlice.actions;

export default masterSlice.reducer