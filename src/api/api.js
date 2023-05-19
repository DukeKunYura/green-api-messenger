import axios from "axios";

axios.defaults.headers = { 'Content-Type': 'application/json' };

export const postMessage = async (idInstance, apiTokenInstance, number, message) => {
    const chatId = `7${number}@c.us`;
    const response = await axios.post(
        `https://api.green-api.com/waInstance${idInstance}/SendMessage/${apiTokenInstance}`,
        {
            chatId,
            message
        }
    );
    return response.data;
};

export const getNotification = async (idInstance, apiTokenInstance) => {
    const response = await axios.get(
        `https://api.green-api.com/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`
    );
    return response.data;
};

export const removeNotification = async (idInstance, apiTokenInstance, receiptId) => {
    const response = await axios.delete(
        `https://api.green-api.com/waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${receiptId}`
    );
    return response.data;
};

