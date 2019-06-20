import React from 'react';
import { route } from './../serverService/index';
import { Form, Button } from 'react-bootstrap';
import './Login.css';

class Login extends React.Component {

    state = { userName: "", password: "" };

    changeUserNameInput = (event) => {
        this.setState({ userName: event.target.value })
    }

    changePasswordInput = (event) => {
        this.setState({ password: event.target.value })
    }

    handleLogin = () => {

        const auth = `Basic ${btoa(`${this.state.userName}:${this.state.password}`)}`;
        const userName = this.state.userName;

        fetch(route('/users/login'), {
            method: 'POST',
            headers: new Headers({
                Authorization: auth
            })
        }).then(res => res.json())
            .then(res => {
                if (res.autorized) {
                    this.props.saveUserName(userName);
                    this.props.userLoggedIn();
                }
            })
            .catch(err => console.log(err));
    }


    render() {
        return (
            <div>
                <table align="center" className="login">
                    <tbody>
                        <tr>
                            <td>
                                user name:
                            </td>
                            <td>
                                <Form.Control type="text" value={this.state.userName} onChange={this.changeUserNameInput} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                password:
                            </td>
                            <td>
                                <Form.Control type="password" value={this.state.password} onChange={this.changePasswordInput} />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                <Button onClick={this.handleLogin}>Login</Button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }

}

export default Login;