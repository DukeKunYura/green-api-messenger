import React from 'react'

export default function Message(props) {
    const { item } = props;
    return (
        <div className="box">{item.text}</div>
    )
}
