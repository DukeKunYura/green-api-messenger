import React, { useEffect, useState } from 'react';
import Message from './Message';

export default function List(props) {
    const { list } = props;
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        function removeNonUnique(array, key) {
            return array.filter((obj, index) => {
                return array.findIndex((t) => t[key] === obj[key]) === index;
            });
        }
        setMessages(removeNonUnique(list, "id"));
    }, [props]);

    return (
        <div className='list'>
            {messages.map((item) => <Message item={item} key={item.id} />)}
        </div>

    )
}
