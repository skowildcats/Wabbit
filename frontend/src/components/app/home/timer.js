import React, { useEffect, useState } from 'react';
import { useTimer } from 'react-timer-hook';

export default function Timer({ expiryTimestamp,toggle}) {
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp, onExpire: () => pause(), autoStart: false});

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
          <button onClick={pause} onMouseDown={toggle}>
            <img src={process.env.PUBLIC_URL + "/pause.svg"} alt="pause" />
          </button>
        ) : (
          <button onClick={start} onMouseDown={toggle}>
            <img src={process.env.PUBLIC_URL + "/play.svg"} alt="play" />
          </button>
        )}
        {/* <button onClick={resume}>
          resume
        </button> */}
      </div>
    </div>
  );
}