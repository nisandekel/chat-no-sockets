import React from 'react';
import './Message.css';

const Message = (props)=>{
    return(
        <div className="msg">
            <div className="bold-text">{props.userName}</div>
            <div className="msg-content">{props.content}</div>
            <div className="bold-text">{props.timeAndDate}</div>
        </div>
    )
}

export default Message;