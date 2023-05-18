import axios from "axios";

axios.defaults.headers = { 'Content-Type': 'application/json' };

export const postMessage = async (idInstance, apiTokenInstance, { chatId, message }) => {
    const response = await axios.post(
        `https://api.green-api.com/waInstance${idInstance}/SendMessage/${apiTokenInstance}`,
        {
            chatId,
            message
        }
    );
    return response.data;
};

// export const getAllMessage = async (idInstance, apiTokenInstance) => {
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
//         getAllMessage();

//     }

// };

export const getMessage = async (idInstance, apiTokenInstance) => {
    const response = await axios.get(
        `https://api.green-api.com/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`
    );
    console.log(response.data.receiptId)
    axios.delete(
        `https://api.green-api.com/waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${response.data.receiptId}`
    );
    return response.data;

};



export const getNotification = async (idInstance, apiTokenInstance) => {
    const response = await axios.get(
        `https://api.green-api.com/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`
    );
    return response.data;
};

export const removeNotification = async (idInstance, apiTokenInstance, chatId, message) => {
    const response = await axios.delete(
        `https://api.green-api.com/waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${receiptId}`
    );
    return response.data;
};

