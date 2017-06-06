import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import {configured} from './firebase';
import Memo from './Memo.js';
import Timer from './Timer.js';
import Tasks from './Tasks.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardMedia, CardTitle} from 'material-ui/Card';
//import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
let database = firebase.database();
let provider = new firebase.auth.GoogleAuthProvider();

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      memo: '',
      timeron: false,
      timertwofive: false,
      tasks: [],
    };
    this.startTimer = this.startTimer.bind(this);
    this.onFiveEnd = this.onFiveEnd.bind(this);
    this.onTwentyFiveEnd = this.onTwentyFiveEnd(this);
    this.handleMemoChange = this.handleMemoChange.bind(this);
    //this.handleMemoSubmit = this.handleMemoSubmit.bind(this);
    this.sendData = this.sendData.bind(this);
    this.getAllMemos = this.getAllMemos.bind(this);
    this.getMemos = this.getMemos.bind(this);
  }
  componentDidMount() {
    this.getMemos();
  }

  //Memo Functions
  handleMemoSubmit = e => {
    console.log(this.props);
    let updatedTaskList = this.state.tasks;
    updatedTaskList.push(this.state.memo);

    this.setState({
      ...this.state,
      memo: '',
      tasks: updatedTaskList,
    });
    this.handleMemoChange = this.handleMemoChange.bind(this);
    this.handleMemoSubmit = this.handleMemoSubmit.bind(this);
    this.sendData(updatedTaskList, e);
  };

  sendData = (updatedTaskList, e) => {
    let tasksRef = firebase.database().ref('/' + this.props.id);
    tasksRef.set({
      name: this.props.name,
      id: this.props.id,
      email: this.props.email,
      tasks: updatedTaskList,
    });
    //e.preventDefault();
  };

  handleMemoChange = e => {
    this.setState({
      ...this.state,
      memo: e.target.value,
    });
    console.log(e.target.value);
  };

  //handle completed memos
  getMemos() {
    let memos = database.ref('/' + this.props.id);
    memos.once('value', snapshot => {
      this.getAllMemos(snapshot.val());
    });
  }

  getAllMemos(data) {
    if (data) {
      let memos = data.tasks;
      this.setState({
        ...this.state,
        tasks: memos,
      });
    }
  }

  //timer functions
  onTwentyFiveEnd() {
    this.setState({
      ...this.state,
      timertwofive: false,
    });
  }

  onFiveEnd() {
    this.setState({
      ...this.state,
      timeron: false,
    });
  }

  startTimer() {
    if (!this.state.timeron && this.state.memo) {
      this.handleMemoSubmit();
      this.setState({
        ...this.state,
        timeron: true,
        timertwofive: true,
      });
    }
  }

  render() {
    let timer;
    if (this.state.timeron) {
      if (this.state.timertwofive) {
        timer = <Timer seconds={1500} function={this.onTwentyFiveEnd} />;
      } else {
        timer = <Timer seconds={300} function={this.onFiveEnd} />;
      }
    } else {
      timer = <div />;
    }
    return (
      <div className="App">
        <div>
          <MuiThemeProvider>
            <div>
              <Card>
                <CardMedia />
                <CardTitle
                  title="Tomato Timer"
                  subtitle="Login and submit a memo to get started."
                />
                <CardActions>
                  <button /*onClick={Add Leaderboard component here}*/>
                    Leaderboard
                  </button>
                </CardActions>
              </Card>
            </div>
          </MuiThemeProvider>
        </div>
        <div className="timerButton">
          <button onClick={this.startTimer}> Start Timer</button>
        </div>
        <div className="timer">
          {timer}
        </div>
        <div>
          <Memo
            value={this.state.memo}
            handleMemoChange={this.handleMemoChange}
          />
        </div>
        <Tasks tasks={this.state.tasks} />
      </div>
    );
  }
}
