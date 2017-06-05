import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import { configured } from './firebase';
import Memo from './Memo.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card, CardActions, CardMedia, CardTitle } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

var provider = new firebase.auth.GoogleAuthProvider();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      name: "",
      email: "",
      id: ""
    }
    this.handleLogIn = this.handleLogIn.bind(this);
  }
  //Google Authentication

  handleLogIn() {
    if (this.state.loggedIn) {
      firebase.auth().signOut().then(() => {
        this.setState({
          loggedIn: false,
          name: "",
          email: "",
          id: ""
        });
      }).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
      })
      //Memo Functions
      handleMemoSubmit(e) {
        var updatedTaskList = this.state.tasks;
        updatedTaskList.push(this.state.memo);

        this.setState({
          memo: "",
          tasks: updatedTaskList
        })

        this.sendData(updatedTaskList, e);
      }

      sendData(updatedTaskList, e) {
        var tasksRef = firebase.database().ref('/');
        tasksRef.set({
          tasks: updatedTaskList,
        })
        e.preventDefault();
      }

      handleMemoChange(e) {
        this.setState({
          memo: e.target.value,
        })
      }

    }
    else {
      firebase.auth().signInWithPopup(provider).then((result) => {
        this.setState({
          loggedIn: true,
          name: result.user.displayName,
          email: result.user.email,
          id: result.user.uid
        })
      }).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;


      });
    }
  }
  render() {
    return (
      <div className="App">
        <div>
          <MuiThemeProvider>
            <div>
              <Card>
                <CardMedia />
                <CardTitle title="Tomato Timer" subtitle="Login and submit a memo to get started." />
                <CardActions>
                  <RaisedButton onClick={() => this.handleLogIn(this.state.logInState)} >
                    {this.state.loggedIn && <div>Log Out</div>}{!this.state.loggedIn && <div>Log In</div>}
                  </RaisedButton>
                  <RaisedButton /*onClick={Add Leaderboard component here}*/>Leaderboard</RaisedButton>
                </CardActions>
              </Card>
            </div>
          </MuiThemeProvider>
        </div>
        <Memo />
      </div>
    );
  }
}

export default App;

