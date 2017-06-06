import React, {Component} from 'react';
import ReactCountdownClock from 'react-countdown-clock';

// This component uses the 'react-countdown-clock' module.  Abstracts some of the props away,
// so now only "seconds" (how many seconds you want it to run) and "onComplete" (the function
// to call when the countdown finishes)
class Timer extends Component {
  render() {
    return (
      <ReactCountdownClock
        seconds={this.props.seconds}
        color="#000"
        alpha={0.9}
        size={300}
        timeFormat="hms"
        onComplete={() => this.props.function}
      />
    );
  }
}

export default Timer;
