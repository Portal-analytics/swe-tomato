import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import {configured} from './firebase';

var provider = new firebase.auth.GoogleAuthProvider();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      name:"",
      email:"",
      id:""
    }
    this.handleLogIn = this.handleLogIn.bind(this);
  }

  handleLogIn(){
    if(this.state.loggedIn){
      firebase.auth().signOut().then(() => {
        this.setState({
          loggedIn: false,
          name:"",
          email:"",
          id:""
        });
      }).catch(function(error){
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;

        
      })
    }
    else{
      firebase.auth().signInWithPopup(provider).then((result) => {
        this.setState({
          loggedIn:true,
          name:result.user.displayName,
          email:result.user.email,
          id:result.user.uid
        })
      }).catch(function(error){
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
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={() => this.handleLogIn(this.state.logInState)}>
          {this.state.loggedIn && <div>Log Out</div> }{!this.state.loggedIn && <div>Log In</div> }
        </button>
      </div>
    );
  }
}

export default App;

 