import React from 'react'

export default function Message({message, style, header, step, target, setStep}) {
  return (
    <div id="walkthrough-msg" style={style}>
      <div className="header">{header}</div>
      {step === 0 ? <img src={process.env.PUBLIC_URL + "/tutorial.svg"} alt="tutorial"></img> : null}
      <span>{message}</span>
      <div className="btn-container">
        <button className="skip">Skip</button>
        <button className="continue">Continue</button>
      </div>
    </div>
  )
}
