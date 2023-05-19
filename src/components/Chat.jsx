import React, { useEffect, useState, useCallback } from 'react';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { getNotification, removeNotification, postMessage, getMessage } from '../api/api';
import { setMessages } from '../redux/masterSlice';

export default function Chat(props) {
    const { activeChat } = props;
    const state = useSelector((state) => state.master);
    const [chatId, setchatId] = useState("79036360935@c.us");
    const [message, setMessage] = useState("получилось");
    const [count, setCount] = useState(0);
    const [list, setList] = useState([]);

    const dispatch = useDispatch();


    const handlerSend = () => {
        postMessage(state.idInstance, state.apiTokenInstance, { chatId, message });
    };

    const getData = () => {
        getNotification(state.idInstance, state.apiTokenInstance).then(res => {
            if (res) {
                removeNotification(state.idInstance, state.apiTokenInstance, res.receiptId)
                if (res.body.typeWebhook === "outgoingMessageReceived" &&
                    res.body.senderData.chatId === chatId &&
                    res.body.messageData.typeMessage === 'textMessage') {
                    if (!list.some(item => item.id === res.body.idMessage)) {
                        setList(prev => [...prev, {
                            text: res.body.messageData.textMessageData.textMessage,
                            id: res.body.idMessage
                        }]);
                        dispatch(setMessages({ chatId: res.body.senderData.chatId, chat: list }))


                    }
                }
            }
        })

    };

    //     sendMessage("1101822105", "4bc49f091caa40a0bc8c8e6c895e0dc55dfc2155aad5401db2", "79036360935@c.us", "message to you!")


    useEffect(() => {
        const interval = setInterval(() => getData(), 5200);
        return () => {
            clearInterval(interval)
        }
    }, [getData]);

    return (
        <div>
            {activeChat}
            <button onClick={handlerSend}>send</button>
            {/* <button onClick={handlerGet}>get</button> */}
            {/* <button onClick={green}>gren</button> */}
            {/* <button onClick={greenAll}>grenAllFunc</button> */}


        </div>
    )
}
