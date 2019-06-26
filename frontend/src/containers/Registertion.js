import React from 'react';
import { route } from './../serverService/index';
import { Form, Button } from 'react-bootstrap';
import Banner from './../components/Banner';
import './Registretion.css';


class Registretion extends React.Component {

    state = {
        userName: "", password: "", secondPassword: "",
        banner: { isDisplayed: false, msg: "", color: null }
    };
    bannerTimeOut = null;

    changeUserName = (event) => {
        this.setState({ userName: event.target.value });
    }

    changePassword = (event) => {
        this.setState({ password: event.target.value });
    }

    changeSecondPassword = (event) => {
        this.setState({ secondPassword: event.target.value });
    }

    showBanner = (msg, color) => {
        const banner = { isDisplayed: true, msg, color };
        this.setState({ banner });
        this.bannerTimeOut = setTimeout(() => {
            const banner = { isDisplayed: false, msg: "", color: null };
            this.setState({ banner })
        }, 3000);
    }

    componentWillUnmount() {
        clearTimeout(this.bannerTimeOut);
    }

    sendData = async () => {
        if (!this.checkValidation()) {
            return;
        }
        const randomAvatar = await this.getAvatar();
        const newUser = {
            userName: this.state.userName, password: this.state.password,
            secondPassword: this.state.secondPassword, avatar: randomAvatar
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
                if (res.usrUploded) {
                    this.showBanner("your deatails were saved!", 1);
                }
                else if (res.duplicateUniqeField) {
                    this.showBanner("user name already exist", 0);
                }
            })
            .catch(err => this.showBanner("failed to register", 0));
    }

    checkValidation = () => {
        if (this.state.userName === "" || this.state.password === "" || this.state.secondPassword === "") {
            this.showBanner("please fill in all fields", 0);
            return false;
        }

        if (this.state.password.length < 8) {
            this.showBanner("password has to be at least 8 characters", 0);
            return false;
        }

        if (this.state.password !== this.state.secondPassword) {
            this.showBanner("first password doesn't match to the second password", 0);
            return false;
        }
        return true;
    }

    getAvatar = () => {
        return fetch("https://randomuser.me/api/")
            .then(res => res.json())
            .then(res=>res.results.pop().picture.large)
            .catch(err=>console.log(err));
    }

    render() {
        return (
            <div>
                <table align="center" className="registretion" cellPadding="10%">
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
                                repeat password:
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
                <Banner isDisplayed={this.state.banner.isDisplayed} msg={this.state.banner.msg}
                    color={this.state.banner.color} />
            </div>
        );
    }
}

export default Registretion;