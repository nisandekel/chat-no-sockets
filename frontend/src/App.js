import React from 'react';
import Login from './containers/Login';
import Registretion from './containers/Registertion';
import Chat from './containers/Chat';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Header from './components/Header';
import './App.css';

class App extends React.Component {

  state = {
    isLoggedIn: localStorage.getItem("isLoggedIn") || false,
    userName: localStorage.getItem("userName") || "",
    userAvatar: localStorage.getItem("userAvatar") || ""
  };
  appTitle = "Rolling Chat";

  userLoggedIn = (userName, userAvatar) => {
    localStorage.setItem("isLoggedIn", true);
    localStorage.setItem("userName", userName);
    localStorage.setItem("userAvatar", userAvatar);
    this.setState({ isLoggedIn: true, userName, userAvatar });
  }

  userLoggedOut = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    localStorage.removeItem("userAvatar");
    this.setState({ isLoggedIn: false, userName: "" });
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Header title={this.appTitle} userLoggedOut={this.userLoggedOut}
            isLoggedIn={this.state.isLoggedIn} />
          <Route path="/" exact render={() => (
            this.state.isLoggedIn ? (<Redirect to='/Chat/' />) :
              (<Login userLoggedIn={this.userLoggedIn} />)
          )} />
          <Route path="/Registretion/" exact component={Registretion} />
          <Route path="/Chat/" exact render={() => <Chat isLoggedIn={this.state.isLoggedIn}
            userName={this.state.userName} userAvatar={this.state.userAvatar}/>} />
        </Router>
      </div>
    );
  }

}

export default App;
