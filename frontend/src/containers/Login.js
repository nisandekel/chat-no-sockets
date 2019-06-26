import React from 'react';
import { route } from './../serverService/index';
import { Form, Button } from 'react-bootstrap';
import Banner from './../components/Banner';
import './Login.css';

class Login extends React.Component {

    state = { userName: "", password: "", banner: { isDisplayed: false, msg: "", color: null } };
    bannerTimeOut = null;

    changeUserNameInput = (event) => {
        this.setState({ userName: event.target.value })
    }

    changePasswordInput = (event) => {
        this.setState({ password: event.target.value })
    }

    handleLogin = () => {

        if (this.state.userName === "" || this.state.password === "") {
            this.showBanner("please fill in all fields",0);
            return;
        }

        const auth = `Basic ${btoa(`${this.state.userName}:${this.state.password}`)}`;
        
        fetch(route('/users/login'), {
            method: 'POST',
            headers: new Headers({
                Authorization: auth
            })
        }).then(res => res.json())
            .then(res => {
                if (res.autorized) {
                    this.props.userLoggedIn(res.userName,res.userAvatar);
                }
            })
            .catch(err => {
                if (err.name === "TypeError") {
                    this.showBanner("failed to login",0);
                }
                else if (err.name === "SyntaxError") {
                    this.showBanner("one or more fields are incorrect",0);
                }
            });
    }

    showBanner = (msg,color) => {
        const banner = { isDisplayed: true, msg, color};
        this.setState({ banner });
        this.bannerTimeOut = setTimeout(() => {
            const banner = { isDisplayed: false, msg: "", color: null };
            this.setState({ banner })
        }, 3000);
    }

    componentWillUnmount() {
        clearTimeout(this.bannerTimeOut);
    }

    render() {
        return (
            <div>
                <table align="center" className="login" cellPadding="10%">
                    <tbody>
                        <tr>
                            <td>
                                user name:
                            </td>
                            <td>
                                <Form.Control type="text" value={this.state.userName}
                                    onChange={this.changeUserNameInput} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                password:
                            </td>
                            <td>
                                <Form.Control type="password" value={this.state.password}
                                    onChange={this.changePasswordInput} />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                <Button onClick={this.handleLogin}>Login</Button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <Banner isDisplayed={this.state.banner.isDisplayed} msg={this.state.banner.msg}
                    color={this.state.banner.color} />
            </div>
        )
    }

}

export default Login;