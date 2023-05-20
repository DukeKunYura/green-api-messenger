import React, { useEffect, useState } from 'react';

export default function Contacts(props) {
    const { contacts, setActiveChat } = props
    const [list, setList] = useState([]);

    useEffect(() => {
        setList([...new Set(contacts)]);
    }, [props]);

    return (
        <>
            <h4 className="title4">Contacts</h4>
            {list.map((item) => <div className="contact" key={item}>
                <button className="button is-success" onClick={() => { setActiveChat(item) }}>{item}</button>
                <br /></div>)}
        </>

    )
}
