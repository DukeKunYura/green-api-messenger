import React, { useState } from 'react';
import Chat from './Chat';

export default function ChatScreen() {
    const [contacts, setContacts] = useState([]);
    const [newContact, setNewContact] = useState("");
    const [activeChat, setActiveChat] = useState("");


    const handleSubmit = () => {
        console.log(newContact);
        setNewContact("");
        setActiveChat(newContact);

    };


    return (
        <>
            <Chat activeChat={activeChat} />
            <form className='Form' onSubmit={evt => { evt.preventDefault(); handleSubmit() }}>
                <input
                    className='Input'
                    placeholder="Введите номер"
                    maxLength={10}
                    value={newContact}
                    onChange={(e) => { setNewContact(e.target.value) }} />
                <button type='submit'>Submit</button>
            </form>
        </>


    )
}
