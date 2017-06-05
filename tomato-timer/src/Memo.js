import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';

class Memo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            memo: "",
            tasks: [],
        }
    }

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
        tasksRef.set( {
            tasks: updatedTaskList,
        })
        e.preventDefault();
    }

    handleMemoChange(e) {
        this.setState({
            memo: e.target.value,
        })
    }

    render() {

        return (
            <div className="memo">
                <div className="memo-description">
                    <h2>This is the memo descripton.</h2>
                </div>

                <div className="memo-text-field">
                    <input type="text" className="memo-input" label="Write Memo Here" onChange={(e) => this.handleMemoChange(e)} />
                    <button className="memo-submit" onClick={(e) => this.handleMemoSubmit(e)}>Submit</button>
                </div>

            </div>

        )
    }
}

export default Memo;