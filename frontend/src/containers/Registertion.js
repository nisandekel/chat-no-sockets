import React from 'react';
import { route } from './../serverService/index';
import { Form, Button } from 'react-bootstrap';
import './Registretion.css';


class Registretion extends React.Component {

    state = { userName: "", password: "", secondPassword: "" };

    changeUserName = (event) => {
        this.setState({ userName: event.target.value });
    }

    changePassword = (event) => {
        this.setState({ password: event.target.value });
    }

    changeSecondPassword = (event) => {
        this.setState({ secondPassword: event.target.value });
    }

    sendData = () => {
        const newUser = {
            userName: this.state.userName, password: this.state.password,
            secondPassword: this.state.secondPassword
        };
        fetch(route("/users/registretion"), {
            method: 'POST',
            body: JSON.stringify(newUser),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {
                this.setState({ userName: "", password: "", secondPassword: "" });
                if (res.success) {
                    alert("your deatails were saved!");

                }
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div>
                <table align="center" className="registretion">
                    <tbody>
                        <tr>
                            <td>
                                user name:
                            </td>
                            <td>
                                <Form.Control type="text" value={this.state.userName}
                                    onChange={this.changeUserName}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                password:
                            </td>
                            <td>
                                <Form.Control type="password" value={this.state.password}
                                    onChange={this.changePassword}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                repet password:
                            </td>
                            <td>
                                <Form.Control type="password" value={this.state.secondPassword}
                                    onChange={this.changeSecondPassword}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <Button onClick={this.sendData}>submit</Button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Registretion;