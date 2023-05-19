import React, { useEffect, useState, useCallback } from 'react';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { getNotification, removeNotification, postMessage, getMessage } from '../api/api';
import { setChat } from '../redux/masterSlice';

export default function ChatScreen() {
    const state = useSelector((state) => state.master);
    const [chatId, setchatId] = useState("79105932086@c.us");
    const [message, setMessage] = useState("получилось");
    const [count, setCount] = useState(0);
    const [list, setList] = useState([]);

    const dispatch = useDispatch();


    const handlerSend = () => {
        postMessage(state.idInstance, state.apiTokenInstance, { chatId, message });
    };
    const handlerGet = () => {
        let receiptId = null;
        console.log(getNotification(state.idInstance, state.apiTokenInstance));
        removeNotification(state.idInstance, state.apiTokenInstance,)

    };

    const greenAll = () => {
        getMessage(state.idInstance, state.apiTokenInstance)

    };

    const getData = useCallback(() => {
        getNotification(state.idInstance, state.apiTokenInstance).then(res => {
            if (res) {
                removeNotification(state.idInstance, state.apiTokenInstance, res.receiptId)
                if (res.body.senderData && res.body.messageData && res.body.senderData.chatId === chatId && res.body.messageData.typeMessage === 'textMessage') {
                    setList(prev => [...prev, {
                        text: res.body.messageData.textMessageData.textMessage
                    }]);
                }
            }
        })

    }, [state.idInstance, state.apiTokenInstance]);


    // async function green() {

    //     axios.defaults.headers = {
    //         'Content-Type': 'application/json'
    //     }

    //     const sendMessage = async (idInstance, apiTokenInstance, chatId, message) => {
    //         const response = await axios.post(
    //             `https://api.green-api.com/waInstance${idInstance}/SendMessage/${apiTokenInstance}`,
    //             {
    //                 chatId,
    //                 message
    //             }
    //         );

    //         return response.data;
    //     };

    //     sendMessage("1101822105", "4bc49f091caa40a0bc8c8e6c895e0dc55dfc2155aad5401db2", "79036360935@c.us", "message to you!")

    // }

    // const getAllMessage = async (idInstance, apiTokenInstance) => {
    //     const response = await axios.get(
    //         `https://api.green-api.com/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`
    //     );
    //     if (response) {
    //         if (response.data) {
    //             if (response.data.body.typeWebhook === "incomingMessageReceived") {
    //                 if (response.data.body.messageData.typeMessage === "textMessage" &&
    //                     response.data.body.senderData.chatId === "79036360935@c.us") {
    //                     dispatch(setChat(response.data.body.messageData.textMessageData.textMessage))
    //                 }
    //             }
    //             axios.delete(
    //                 `https://api.green-api.com/waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${response.data.receiptId}`
    //             );
    //         }
    //         getAllMessage(idInstance, apiTokenInstance);

    //     }

    // };

    useEffect(() => {
        const interval = setInterval(() => getData(), 5000);
        return () => {
            clearInterval(interval)
        }
    }, [getData]);

    // const getRequest = async () => {
    //     const response = await MessageService.get()
    //     if (response) {
    //         if (response.data) {
    //             console.log(response.data.body.typeWebhook)
    //             if (response.data.body.typeWebhook === "incomingMessageReceived") {
    //                 if (response.data.body.messageData.typeMessage === "textMessage" &&
    //                     response.data.body.senderData.chatId === `${payloadData.chatId}@c.us`) {
    //                     const newMessage = {
    //                         name: payloadData.chatId,
    //                         message: response.data.body.messageData.textMessageData.textMessage
    //                     }
    //                     setChat((prevState) => ({
    //                         ...prevState,
    //                         [response.data.body.idMessage]: {
    //                             ...newMessage
    //                         }
    //                     }))
    //                 }
    //             }
    //             await MessageService.delete(response.data.receiptId)
    //         }
    //         getRequest()
    //     } else {
    //         console.log("ERRR")
    //     }
    // }

    return (
        <div>
            <button onClick={handlerSend}>send</button>
            <button onClick={handlerGet}>get</button>
            {/* <button onClick={green}>gren</button> */}
            <button onClick={greenAll}>grenAllFunc</button>


        </div>
    )
}
