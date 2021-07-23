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
        <span>{days < 10 ? "0" + days : days}</span>:<span>{hours < 10 ? "0" + hours : hours}</span>:<span>{minutes < 10 ? "0" + minutes : minutes}</span>:<span>{seconds < 10 ? "0" + seconds : seconds}</span>
      </div>
      <div id="timer-control">
        {isRunning ? 
        <button onClick={pause}>Pause</button> : <button onClick={start}>Start</button> }
      </div>
    </div>
  );
}