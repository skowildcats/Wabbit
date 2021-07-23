import React from 'react';
import { useStopwatch } from 'react-timer-hook';

export default function MyStopwatch() {
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: false });


  return (
    <div id="timer">
      <div>
        <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      </div>
      <div id="timer-control">
        {isRunning ? 
        <button onClick={pause}>Pause</button> : <button onClick={start}>Start</button> }
      </div>
    </div>
  );
}