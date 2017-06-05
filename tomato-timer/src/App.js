import React, { Component } from 'react';
import Login from './googleAuth.js';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import {configured} from './firebase';

var provider = new firebase.auth.GoogleAuthProvider();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedin: false,
      name:"",
      email:"",
      id:""
    }
    this.handleLogIn = this.handleLogIn.bind(this);
  }

  handleLogIn(){
    console.log(this.state.loggedin)
    if(this.state.loggedin){
      firebase.auth().signOut().then(() => {
        this.setState({
          loggedin: false,
          name:"",
          email:"",
          id:""
        });
      }).catch(function(error){
      })
    }
    else{
      firebase.auth().signInWithPopup(provider).then((result) => {
        this.setState({
          loggedin:true,
          name:result.user.displayName,
          email:result.user.email,
          id:result.user.uid
        })
      }).catch(function(error){
      });
    }
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={() => this.handleLogIn(this.state.logInState)}>
          {this.state.loggedin && <div>Log Out</div> }{!this.state.loggedin && <div>Log In</div> }
        </button>
      </div>
    );
  }
}

export default App;

 