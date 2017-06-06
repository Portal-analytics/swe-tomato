import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import {configured} from './firebase';
import Memo from './Memo.js';
import Timer from './Timer.js';
import Tasks from './Tasks.js';
import Login from './Login.js';
import Main from './Main.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardMedia, CardTitle} from 'material-ui/Card';
//import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
let database = firebase.database();
let provider = new firebase.auth.GoogleAuthProvider();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      name: '',
      email: '',
      id: '',
    };
    this.handleLogIn = this.handleLogIn.bind(this);
  }

  //Google Authentication

  handleLogIn() {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        this.setState({
          ...this.state,
          loggedIn: true,
          name: result.user.displayName,
          email: result.user.email,
          id: result.user.uid,
        });
      })
      .catch(function(error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        // The email of the user's account used.
        let email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        let credential = error.credential;
      });
  }
  render() {
    if (!this.state.loggedIn) {
      return <Login handleLogIn={this.handleLogIn} />;
    } else {
      return (
        <MuiThemeProvider>
          <Main
            name={this.state.name}
            email={this.state.email}
            id={this.state.id}
          />
        </MuiThemeProvider>
      );
    }
  }
}

export default App;
