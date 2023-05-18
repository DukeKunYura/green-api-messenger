import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    idInstance: "",
    apiTokenInstance: "",
    contacts: [],
    logged: false,
    chat: []
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
        setChat: (state, action) => {
            state.chat = [action.payload, ...state.chat]
        }
    }
}
);


export const {
    setIdInstance,
    setApiTokenInstance,
    setContacts,
    setLogged,
    setChat } = masterSlice.actions;

export default masterSlice.reducer