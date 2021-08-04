import React from 'react'

export default function Message(props) {
  return (
    <div id="walkthrough-msg" style={props.style}>
      <span className="header">{props.header}</span>
      <span>{props.message}</span>
        {props.step === 0 ? <img src={process.env.PUBLIC_URL + "/tasklist.svg"} alt="tutorial"></img> : null}  
      
      <div className="btn-container">
        <button onClick={props.closeWalkthrough} className="skip">Skip</button>
        <button onClick={props.nextStep} className="continue">Continue</button>
      </div>
    </div>
  )
}
