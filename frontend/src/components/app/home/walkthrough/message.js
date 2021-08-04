import React from 'react'

export default function Message({message, style, target, setStep}) {
  return (
    <div id="walkthrough-msg" >
      {message}
    </div>
  )
}
