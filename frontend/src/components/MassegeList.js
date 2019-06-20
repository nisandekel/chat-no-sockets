import React from 'react';
import Message from './Message';
import './MessageList.css';

const MessageList = (props) => {

    const messages = props.messages.map(msg => {
        return (
            <li key={msg.id}>
                <Message id={msg.id} content={msg.content} userName={msg.userName}
                    timeAndDate={msg.timeAndDate} />
            </li>
        )
    })

    return (
        <ul className="msg-list" type="none">
            {messages}
        </ul>
    )
}

export default MessageList;