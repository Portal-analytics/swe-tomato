import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login-component';

class Login extends React.Component{
  constructor (props, context) {
    super(props, context);
  }
 
  responseGoogle (googleUser) {
    
    var id_token = googleUser.getAuthResponse().id_token;
    console.log({accessToken: id_token});
    //anything else you want to do(save to localStorage)... 
  }
 
  render () {
    return (
      <div>
        <GoogleLogin socialId="37256474259-3fgli161gc61jfe7ioqiku1c81mq5039.apps.googleusercontent.com"
                     class="google-login"
                     scope="profile"
                     responseHandler={this.responseGoogle}
                     buttonText="Login With Google"/>
      </div>
    );
  }
 
}
 
export default Login;



//eyJhbGciOiJSUzI1NiIsImtpZCI6IjJmODRiYWU5NTIwYzA5NT…fEhU7w6giWyNmtzBUszxdapJ4b3wu-5vnc49KgqFaXWL9cW4A