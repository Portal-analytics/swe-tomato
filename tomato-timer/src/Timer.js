import React, {Component} from 'react';
import ReactCountdownClock from 'react-countdown-clock';

// This component uses the 'react-countdown-clock' module.  Abstracts some of the props away,
// so now only "seconds" (how many seconds you want it to run), "onComplete" (the function
// to call when the countdown finishes), and "paused" (does the clock countdown or not).
class Timer extends Component {
  render() {
    return (
      <ReactCountdownClock
        seconds={this.props.seconds}
        paused={this.props.paused}
        color="#990000"
        alpha={0.9}
        size={500}
        timeFormat="hms"
        onComplete={this.props.function}
      />
    );
  }
}

export default Timer;
