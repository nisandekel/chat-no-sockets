import React from 'react';
import Message from './Message';
import './MessageList.css';

const MessageList = (props) => {

    const messages = props.messages.map(msg => {
        const dateTime = dateTimeFormat(msg.dateTime);
        return (
            <li key={msg.id}>
                <Message id={msg.id} content={msg.content} userName={msg.userName}
                    userAvatar={msg.userAvatar} dateTime={dateTime} />
            </li>
        )
    })

    return (
        <ul className="msg-list" type="none">
            {messages}
        </ul>
    )
}

function dateTimeFormat(dateTime) {
    const dateTimeArr = dateTime.split(".")[0].split(dateTime.charAt(10));
    return dateTimeArr[0] + " " + dateTimeArr[1];
}

export default MessageList;