import React from 'react';
import './Message.css';

const Message = (props) => {
    return (
        <div className="msg">
            <div className="msg-header">
                <div className="usr-details">
                    <img className="user-avatar" src={props.userAvatar} alt="user avatar" />
                    <p className="usr-name bold-text">{props.userName}</p>
                </div>
                <p className="date-time bold-text">{props.dateTime}</p>
            </div>
            <p className="msg-content">{props.content}</p>
        </div>
    )
}

export default Message;