import React, { useEffect, useState } from 'react';

export default function Timer({secondsLeft, minusOneSecond, isRunning, toggleRunning}) {
  
  const[time,setTime] = useState(fromSecondsToTime(secondsLeft))
  const[timer,setTimer] = useState(null)

  function _handleClick(){
    toggleRunning(!isRunning)
  }

  //play and pause timer
  useEffect(()=>{
    if(isRunning) {
      setTimer(setInterval(minusOneSecond,1000))
    }else{
      clearInterval(timer)
      setTimer(null)
    }
  },[isRunning])

  //update display of timer
  useEffect(()=>{
    setTime(fromSecondsToTime(secondsLeft))
    if(secondsLeft<=0){
      clearInterval(timer)
      setTimer(null)
    }
  },[secondsLeft])

  //pause timer when page is closed
  useEffect(()=>{
    debugger
    return ()=>{
      debugger
      clearInterval(timer)
    }
  },[])

  return (
    <div className="timer">
      <div>
        <span>{time.hours < 10 ? "0" + time.hours : time.hours}</span>:
        <span>{time.minutes < 10 ? "0" + time.minutes : time.minutes}</span>:
        <span>{time.seconds < 10 ? "0" + time.seconds : time.seconds}</span>
      </div>
      <div className="timer-control">
        {isRunning ? (
          <button onClick={_handleClick}>
            <img src={process.env.PUBLIC_URL + "/pause.svg"} alt="pause" />
          </button>
        ) : (
          <button onClick={_handleClick}>
            <img src={process.env.PUBLIC_URL + "/play.svg"} alt="play" />
          </button>
        )}
      </div>
    </div>
  );
}

function fromSecondsToTime(secondsLeft){
  const seconds = secondsLeft % 60;
  const minutesLeft = Math.floor(secondsLeft/60);
  const minutes = minutesLeft % 60;
  const hours = Math.floor(minutesLeft/60);
  return {seconds, minutes, hours};
};