import React, {Component} from 'react';
import './App.css';
import * as firebase from 'firebase';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardMedia, CardTitle} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class Memo extends Component {
  render() {
    return (
      <div className="memo-text-field">
        <input
          type="text"
          className="memo-input"
          value={this.props.value}
          label="Write Memo Here"
          onChange={e => this.props.handleMemoChange(e)}
          placeholder="Enter memo here"
        />
      </div>
    );
  }
}

export default Memo;
