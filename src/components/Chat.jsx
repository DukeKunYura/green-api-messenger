import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getNotification, removeNotification, postMessage } from '../api/api';
import List from './List';
import { v4 as uuidv4 } from 'uuid';

export default function Chat(props) {
    const { activeChat } = props;

    const state = useSelector((state) => state.master);
    const [message, setMessage] = useState("");
    const [list, setList] = useState([]);

    const handlerSend = (number) => {
        postMessage(state.idInstance, state.apiTokenInstance, number, message);
        setList(prev => [...prev, {
            text: message,
            id: uuidv4(),
            timestamp: Date.now(),
            author: "you"
        }]);
        setMessage("");
    };

    const getData = () => {
        getNotification(state.idInstance, state.apiTokenInstance).then(res => {
            if (res) {
                removeNotification(state.idInstance, state.apiTokenInstance, res.receiptId)
                if (res.body.typeWebhook === "outgoingMessageReceived" &&
                    res.body.senderData.chatId === `7${activeChat}@c.us` &&
                    res.body.messageData.typeMessage === 'textMessage') {
                    if (!list.some(item => item.id === res.body.idMessage)) {
                        setList(prev => [...prev, {
                            text: res.body.messageData.textMessageData.textMessage,
                            id: res.body.idMessage,
                            timestamp: res.body.timestamp,
                            author: res.body.senderData.chatId
                        }]);
                    }
                }
            }
        })
    };

    useEffect(() => {
        setList([]);
        setMessage("");
    }, [activeChat]);

    useEffect(() => {
        const interval = setInterval(() => getData(), 5500);
        return () => {
            clearInterval(interval)
        }
    }, [getData, activeChat]);

    return (
        <div>
            {activeChat}
            {list.length !== 0 && <List list={list} />}
            <form className='Form' onSubmit={evt => { evt.preventDefault(); handlerSend(activeChat) }}>
                <input
                    className='Input'
                    placeholder="Введите сообщение"
                    maxLength={10}
                    value={message}
                    onChange={(e) => { setMessage(e.target.value) }} />
                <button type='submit'>Отправить</button>
            </form>
        </div>
    )
}
