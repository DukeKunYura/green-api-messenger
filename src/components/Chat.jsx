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
        <div className='chat'>
            <div className='titleChat'>
                {activeChat}
            </div>
            <div className='messages'>
                {list.length !== 0 && <List list={list} />}
            </div>
            <div className='Form'>
                <form className="field has-addons" onSubmit={evt => { evt.preventDefault(); handlerSend(activeChat) }}>
                    <input className="input"
                        rows="2"
                        placeholder="Enter message"
                        value={message}
                        onChange={(e) => { setMessage(e.target.value) }} />
                    <button className="button is-primary" type='submit'>Send</button>
                </form>
            </div>
        </div>
    )
}
