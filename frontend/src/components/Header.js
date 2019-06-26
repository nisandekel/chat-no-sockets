import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from "react-router-dom";

import './Header.css';

const Header = (props) => {

    const linkName = props.isLoggedIn ? "Logout" : "Login";

    return (
        <div className="header">
            <div className="title">
                <img className="left-img header-img" src="https://www.freeiconspng.com/uploads/car-wheel-png-image-free-download--car-wheel-png-image-free--11.png" alt="wheel"/>
                <h1>{props.title}</h1>
                <img className="right-img header-img" src="https://www.freeiconspng.com/uploads/car-wheel-png-image-free-download--car-wheel-png-image-free--11.png" alt="wheel"/>
            </div>
            <Navbar bg="dark" variant="dark" className="navbar">
                <div className="navbar-links">
                    <Link className="link" to="/" onClick={props.userLoggedOut}>{linkName}</Link>
                    <Link className="link" to="/Registretion/">Registretion</Link>
                    {props.isLoggedIn ? (<Link className="link" to="/Chat/">Chat</Link>) : null}
                </div>
            </Navbar>
        </div>
    )

}

export default Header;