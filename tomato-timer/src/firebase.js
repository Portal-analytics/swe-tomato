import * as firebase from 'firebase';
import {authkey} from './apikeys'
export const config = {
    apiKey: authkey,
    authDomain: "tomato-timer-30220.firebaseapp.com",
    databaseURL: "https://tomato-timer-30220.firebaseio.com/",
    projectId: "tomato-timer-30220",
    storageBucket: "tomato-timer-30220.appspot.com",
  };

export const configured = firebase.initializeApp(config);