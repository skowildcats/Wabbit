import React from 'react';
import { useTimer } from 'react-timer-hook';

export default function Timer({ expiryTimestamp }) {
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause
  } = useTimer({ expiryTimestamp, onExpire: () => pause() });

  const totalHours = hours + ( days * 24 );

  return (
    <div className="timer">
      <div>
        <span>{totalHours < 10 ? "0" + totalHours : totalHours}</span>:
        <span>{minutes < 10 ? "0" + minutes : minutes}</span>:
        <span>{seconds < 10 ? "0" + seconds : seconds}</span>
      </div>
      <div className="timer-control">
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