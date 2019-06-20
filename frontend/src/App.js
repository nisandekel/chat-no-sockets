import React from 'react';
import Login from './containers/Login';
import Registretion from './containers/Registertion';
import Chat from './containers/Chat';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { Navbar } from 'react-bootstrap';
import Header from './components/Header';
import './App.css';

class App extends React.Component {

  state = { isLoggedIn: false, userName: "" };
  appTitle = "Rolling Chat";

  userLoggedIn = () => {
    this.setState({ isLoggedIn: true });
  }

  userLoggedOut = ()=>{
    this.setState({isLoggedIn:false});
  }

  saveUserName = (userName) => {
    this.setState({ userName });
  }

  render() {

    const linkName = this.state.isLoggedIn ? "Logout" : "Login";

    return (
      <div className="App">
        <Router>
          <Header title={this.appTitle} />
          <Navbar bg="dark" variant="dark" className="navbar">
            <div className="navbar-links">
              <Link className="link" to="/" onClick={this.userLoggedOut}>{linkName}</Link>
              <Link className="link" to="/Registretion/">Registretion</Link>
              <Link className="link" to="/Chat/">Chat</Link>
            </div>
          </Navbar>
          <Route path="/" exact render={() => (
            this.state.isLoggedIn ? (<Redirect to='/Chat/' />) :
              (<Login userLoggedIn={this.userLoggedIn} saveUserName={this.saveUserName} />)
          )} />
          <Route path="/Registretion/" exact component={Registretion} />
          <Route path="/Chat/" exact render={() => <Chat isLoggedIn={this.state.isLoggedIn} userName={this.state.userName} />} />
        </Router>
      </div>
    );
  }

}

export default App;
