import React from 'react';
import { route } from './../serverService/index';
import MessageList from '../components/MassegeList';
import { Form, Button } from 'react-bootstrap';
import './Chat.css';

class Chat extends React.Component {

    state = { messageList: [], inputValue: "" };
    setTimeoutID = null;

    componentDidMount() {
        this.checkIfNeedsUpdate();
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
        const timeAndDate = getTimeAndDate();
        fetch(route('/messages'), {
            method: 'POST',
            body: JSON.stringify({ content, userName: this.props.userName, timeAndDate }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(res => {
                if (res.success) {
                    alert("your message were sent");
                }
            })
            .catch(err => console.log(err))
    }

    checkIfNeedsUpdate = () => {
        fetch(route('/messages/checkUpdates'), {
            method: 'POST',
            body: JSON.stringify({ msgListLength: this.state.messageList.length }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.isNeedUpdate === true) {
                    this.setState({ messageList: res.newList });
                }
            })
            .then(res => {
                this.setTimeoutID = setTimeout(this.checkIfNeedsUpdate, 1000);
            });
    }

    render() {

        console.log("vfdvsv");
        return (

            !this.props.isLoggedIn ? null : (
                <div>
                    <h4>Hello {this.props.userName}</h4>
                    <div className="chat">
                        <Form.Control className="chat-input" type="text" placeholder="put text here..." value={this.state.inputValue} onChange={this.changeInputData} />
                        <Button className="send-msg-btn" onClick={this.sendMsg}>Send</Button>
                        <MessageList messages={this.state.messageList} />
                    </div>
                </div>)
        );
    }
}

function getTimeAndDate() {
    const date = new Date();
    const hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    const minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();


    const time = hours + ":" + minutes;
    return date.toDateString() + " " + time;
}

export default Chat;