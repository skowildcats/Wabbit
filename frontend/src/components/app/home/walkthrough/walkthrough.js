import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import Message from './message'


const list = {
  0: {
    message: 'Welcome to Wabbit, to start the walkthrough, click the next button.',
    target: 'body',
    style: {
      width: 500,
      height: 500,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    }
  }
}
export const Walkthrough = ({open}) => {
  const [step, setStep] = useState(0)
  const [target, setTarget] = useState(undefined) //used to target the specific element that will be highlighted
  if(!open) return null;

  function moveTarget(){

  }
  const currentItem = list[step]
  return ReactDOM.createPortal(
    <>
      <div className='overlay'></div>
      <Message message={currentItem.message} setStep={setStep} style={currentItem.style} target={currentItem.target}/>
    </>
  , document.getElementById('portal'))
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Walkthrough)
