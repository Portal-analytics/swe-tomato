import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React, {Component} from 'react';

export default class Tasks extends Component {
  render() {
    let tasks = this.props.tasks.map(task => {
      return (
        <TableRow selectable={false}>
          <TableRowColumn>{task}</TableRowColumn>
        </TableRow>
      );
    });
    return (
      <Table>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow selectable={false}>
            <TableHeaderColumn>Completed Memos</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {tasks}
        </TableBody>
      </Table>
    );
  }
}
