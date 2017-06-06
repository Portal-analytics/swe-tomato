import React, {Component} from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import * as firebase from 'firebase';
let database = firebase.database();

const data = [
  {name: 'Bill', score: 2},
  {name: 'Will', score: 3},
  {name: 'Jill', score: 1},
];
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Memos Completed',
    dataIndex: 'score',
    key: 'score',
  },
];
export default class LeaderBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this.getData = this.getData.bind(this);
    // this.getLeaderInfo = this.getLeaderInfo;
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    let leaders = database.ref('/');
    leaders.on('value', snapshot => {
      this.getLeaderInfo(snapshot.val());
    });
  }

  getLeaderInfo(data) {
    let users = [];
    Object.keys(data).map(key => {
      let user = data[key];
      user.score = user.tasks.length;
      users.push(user);
    });
    users = users.sort(sortNumber);
    if (users.length > 10) {
      users = users.slice(0, 10);
    }
    this.setState({
      data: users,
    });
  }

  render() {
    let rows = this.state.data.map(person => {
      return (
        <TableRow selectable={false}>
          <TableHeaderColumn>{person.name}</TableHeaderColumn>
          <TableHeaderColumn>{person.score}</TableHeaderColumn>
        </TableRow>
      );
    });
    return (
      <div id="leaderboardTables">
        <h1>All Time LeaderBoard</h1>
        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow selectable={false}>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Memos</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {rows}
          </TableBody>
        </Table>
      </div>
    );
  }
}

function sortNumber(a, b) {
  return b.score - a.score;
}
