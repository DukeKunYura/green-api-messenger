import React, { useEffect, useState } from 'react';

export default function Contacts(props) {
    const { contacts, setActiveChat } = props
    const [list, setList] = useState([]);

    useEffect(() => {
        setList([...new Set(contacts)]);
    }, [props]);

    return (
        <>
            <div>Contacts</div>
            {list.map((item) => <div onClick={() => { setActiveChat(item) }} key={item}>{item}</div>)}
        </>

    )
}
