import React, {Component} from 'react';

export default class Tasks extends Component {
  render() {
    var tasks = this.props.tasks.map(task => {
      return <li>{task}</li>;
    });
    return (
      <div>
        <ul>
          {tasks}
        </ul>
      </div>
    );
  }
}
