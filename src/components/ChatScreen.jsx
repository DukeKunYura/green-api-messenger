import React, { useState } from 'react';
import Chat from './Chat';
import Contacts from './Contacts';

export default function ChatScreen() {
    const [contacts, setContacts] = useState([]);
    const [newContact, setNewContact] = useState("");
    const [activeChat, setActiveChat] = useState("");
    const [isActiveChat, setIsActiveChat] = useState(false);

    const handleSubmit = () => {
        setActiveChat(newContact);
        setContacts(prev => [...prev, newContact]);
        setIsActiveChat(true);
        setNewContact("");

    };

    return (
        <>
            <div className='contacts'>
                <Contacts contacts={contacts} setActiveChat={setActiveChat} />
                {isActiveChat && <button className="button is-light" onClick={() => setIsActiveChat(false)}>New chat</button>}
                {!isActiveChat &&
                    <div className='block'>
                        <form className='Form' onSubmit={evt => { evt.preventDefault(); handleSubmit() }}>
                            <div className="blockInput">
                                <input
                                    className='input'
                                    placeholder="input number 10 digits"
                                    maxLength={10}
                                    minLength={10}
                                    value={newContact}
                                    onChange={(e) => { setNewContact(e.target.value) }} />
                            </div>
                            <button className="button is-light" type='submit'>Start chat</button>
                        </form>
                    </div>}

            </div>
            <div className='chatField'>
                {isActiveChat && <Chat activeChat={activeChat} />}
            </div>
        </>
    )
}
