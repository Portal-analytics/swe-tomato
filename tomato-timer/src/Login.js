import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import {configured} from './firebase';
import Memo from './Memo.js';
import Timer from './Timer.js';
import Tasks from './Tasks.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardMedia, CardTitle} from 'material-ui/Card';
//import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
let database = firebase.database();
let provider = new firebase.auth.GoogleAuthProvider();

export default class Login extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="App">
        <MuiThemeProvider>
          <div>
            <Card>
              <CardMedia />
              <CardTitle
                title="Tomato Timer"
                subtitle="Login and submit a memo to get started."
              />
              <CardActions>
                <RaisedButton onClick={() => this.props.handleLogIn()}>
                  <div>Log In</div>
                </RaisedButton>
              </CardActions>
            </Card>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}
