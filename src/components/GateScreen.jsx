import React from 'react';
import axios from "axios"

export default function GateScreen() {
    async function green() {

        axios.defaults.headers = {
            'Content-Type': 'application/json'
        }

        const sendMessage = async (idInstance, apiTokenInstance, chatId, message) => {
            const response = await axios.post(
                `https://api.green-api.com/waInstance${idInstance}/SendMessage/${apiTokenInstance}`,
                {
                    chatId,
                    message
                }
            );

            return response.data;
        };

        sendMessage("1101822105", "4bc49f091caa40a0bc8c8e6c895e0dc55dfc2155aad5401db2", "79036360935@c.us", "message to you!")

    }

    return (
        <>
            <div>Gate</div>
            <button onClick={() => { green() }}>SendMessage</button>
        </>

    )
}
