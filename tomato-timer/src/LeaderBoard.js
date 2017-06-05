//run 'npm install antd' to get antd components

import React, { Component } from 'react';
import {Table} from 'antd';
import 'antd/dist/antd.css';
var firebase = require('firebase');
var database = firebase.database();

var data =[
    {name:"Bill", score:2},
    {name:"Will", score:3},
    {name:"Jill", score:1}
]
const columns =[
    {title: 'Name',
    dataIndex: 'name',
    key: 'name'},
    {title: 'Memos Completed',
    dataIndex: 'score',
    key: 'score'}
]
export default class LeaderBoard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data:data
        }
        getData();
    }
    render(){
        return(
            <div id="leaderboardTables">
                <h1>All Time LeaderBoard</h1>
                <Table dataSource={this.state.data} columns={columns} />
            </div>
        );
    }
}
function getData(){
    var leaders = database.ref('/leaderboard/')
    leaders.once('value', function(snapshot){
      getLeaderInfo(snapshot.val());
  });
}
function getLeaderInfo(data){
    var users =[];
    for(var key in data){
        var user = data[key]
        users.push(user);
    }
    users.sort(sortNumber);
    this.setState({
        data:users
    })
}
function sortNumber(a,b) {
    return b.score-a.score;
}