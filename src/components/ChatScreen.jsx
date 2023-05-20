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
                {isActiveChat && <button onClick={() => setIsActiveChat(false)}>Новый чат</button>}
                {!isActiveChat &&
                    <div>
                        <form className='Form' onSubmit={evt => { evt.preventDefault(); handleSubmit() }}>
                            <input
                                className='Input'
                                placeholder="Введите номер 10 цифр"
                                maxLength={10}
                                value={newContact}
                                onChange={(e) => { setNewContact(e.target.value) }} />
                            <button type='submit'>Начать чат</button>
                        </form>
                    </div>}

            </div>
            <div className='chatField'>
                {isActiveChat && <Chat activeChat={activeChat} />}
            </div>
        </>
    )
}
