import React from 'react';
import { route } from './../serverService/index';
import MessageList from '../components/MassegeList';
import { Form, Button } from 'react-bootstrap';
import './Chat.css';

class Chat extends React.Component {

    state = { messageList: [], inputValue: "" };
    setTimeoutID = null;
    inputRef = React.createRef();

    componentDidMount() {
        if (this.props.isLoggedIn) {
            this.getMessages();
        }
    }

    shouldComponentUpdate() {
        return this.props.isLoggedIn;
    }

    componentWillUnmount() {
        clearTimeout(this.setTimeoutID);
    }

    changeInputData = (event) => {
        this.setState({ inputValue: event.target.value });
    }

    sendMsg = () => {
        const content = this.state.inputValue;
        this.setState({inputValue:""})
        fetch(route('/messages'), {
            method: 'POST',
            body: JSON.stringify({
                content, userName: this.props.userName,
                userAvatar: this.props.userAvatar
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .catch(err => console.log(err))
    }

    getMessages = () => {
        const msgList = this.state.messageList;
        const lastMessageID = msgList.length ? msgList[msgList.length - 1].id : "emptyList";
        fetch(route('/messages/' + lastMessageID))
            .then(res => res.json())
            .then(res => {
                if (res.isNeedUpdate === true) {
                    const messageList = [...this.state.messageList];
                    const newList = messageList.concat(res.newMessages);
                    this.setState({ messageList: newList });
                    if (lastMessageID !== "emptyList" && this.inputRef.current!==null) {
                        this.inputRef.current.scrollIntoView();
                    }
                }
                this.setTimeoutID = setTimeout(this.getMessages, 1000);
            })
    }

    render() {
        
        let sendMsgStyle = null;
        if(this.state.messageList.length<=2){
            sendMsgStyle = {
                position: "absolute",
                bottom: "0",
                width: "100%"
            }
        }

        return (
            !this.props.isLoggedIn ? null : (
                <div>
                    <h2 className="greet-usr">Hello {this.props.userName} start chating!</h2>
                    <div className="chat">
                        <MessageList messages={this.state.messageList} />
                        <div className="send-msg" style={sendMsgStyle}>
                            <Form.Control ref={this.inputRef} className="chat-input" type="text"
                                placeholder="put text here..." value={this.state.inputValue}
                                onChange={this.changeInputData} 
                                />
                            <Button className="send-msg-btn" onClick={this.sendMsg}>Send</Button>
                        </div>
                    </div>
                </div>)
        );
    }
}

export default Chat;