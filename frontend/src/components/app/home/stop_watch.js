import React from 'react';
import { useStopwatch } from 'react-timer-hook';

export default function Stopwatch() {
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause
  } = useStopwatch({ autoStart: false });

  const totalHours = days * 24 + hours;

  return (
    <div id="timer">
      <div>
        <span>{totalHours < 10 ? "0" + totalHours : totalHours}</span>:
        <span>{minutes < 10 ? "0" + minutes : minutes}</span>:
        <span>{seconds < 10 ? "0" + seconds : seconds}</span>
      </div>
      <div id="timer-control">
        {isRunning ? (
          <button onClick={pause}>
            <img src={process.env.PUBLIC_URL + "/pause.svg"} alt="pause" />
          </button>
        ) : (
          <button onClick={start}>
            <img src={process.env.PUBLIC_URL + "/play.svg"} alt="play" />
          </button>
        )}
      </div>
    </div>
  );
}