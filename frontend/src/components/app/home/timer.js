import React, { useEffect, useState } from 'react';

export default function Timer({secondsLeft,minusOneSecond}) {
  
  const[time,setTime] = useState(fromSecondsToTime(secondsLeft))
  const[isRunning,toggleRunning] = useState(false)
  const[timer,setTimer] = useState(null)

  async function _handleClick(){
    toggleRunning(!isRunning)
  }

  useEffect(()=>{
    if(isRunning) {
      setTimer(setInterval(minusOneSecond,1000))
      console.log('play')
    }else{
      clearInterval(timer)
      setTimer(null)
      console.log('pause')
    }
  },[isRunning])

  useEffect(()=>{
    setTime(fromSecondsToTime(secondsLeft))
  },[secondsLeft])

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
  const seconds = secondsLeft%60
  const minutesLeft = Math.floor(secondsLeft/60)
  const minutes = minutesLeft%60
  const hours = Math.floor(minutesLeft/60)
  return {seconds,minutes,hours}
}

