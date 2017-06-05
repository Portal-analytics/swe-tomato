import React, { Component } from 'react';
import './App.css';
import Tasks from './Tasks.js'
var firebase = require('firebase');
var database = firebase.database();
class Memo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            memo: "",
            tasks: [],
        }
        this.getTasks();
        this.getTasks = this.getTasks.bind(this);
        this.getAllMemos = this.getAllMemos(this);
    }
    getTasks(){
        var tasks = database.ref('/'+this.props.info.id);
        tasks.once('value',function(snapshot){
            getAllMemos(snapshot.val());
        })
    }
    getAllMemos(data){
        for(var key in data){
            console.log(data[key])
            var memos = data[key].tasks
            this.setState, ({
                ...this.state,
                tasks:memos
            })
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
        var tasksRef = firebase.database().ref('/'+this.props.info.id);
        tasksRef.set( {
            name:this.props.info.name,
            id:this.props.info.id,
            tasks: updatedTaskList,
            email:this.props.info.email

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
                    <input type="text" className="memo-input" label="Write Memo Here" value={this.state.memo} onChange={(e) => this.handleMemoChange(e)} />
                    <button className="memo-submit" onClick={(e) => this.handleMemoSubmit(e)}>Submit</button>
                    <Tasks tasks={this.state.tasks}/>
                </div>

            </div>

        )
    }
}
function getTasks(){
    var tasks = firebase.database.ref('/'+this.props.info.id);
    tasks.once('value',function(snapshot){
        getAllMemos(snapshot.val());
    })
}

function getAllMemos(data){
    for(var key in data){
        var memos = data[key].tasks
        this.setState, ({
            ...this.state,
            tasks:memos
        })
    }
}
export default Memo;