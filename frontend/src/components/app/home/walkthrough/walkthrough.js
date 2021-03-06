import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import Message from './message'
import { patchUser } from '../../../../actions/session_actions';

const list = [
  {
    message: 'Wabbit is your canvas for organizing a To-Do list. Follow the tour to learn about Wabbit or come back to the walkthrough later by pressing skip.',
    header: 'Welcome to Wabbit',
    target: 'body',
    style: {
      width: 600,
      height: 250,
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    }
  },
  {
    message: 'This panel is for habits',
    target: '#habits',
    style: {
      
    }
  }
]
export const Walkthrough = (props) => {
  const [step, setStep] = useState(0)
  const [target, setTarget] = useState(undefined) //used to target the specific element that will be highlighted
  useEffect(() => {
    if(step === 0){

    } else {
      let item = document.querySelector(list[step].target)
      item.style.zIndex = 500;
      item.style.position = 'relative';
    }
  }, [step])
  if(!props.open) return null;

  function nextStep(){
    if(step === 12){ //last step
      props.setWalkthrough(false);
    }
    setStep(step + 1);
  }
  function moveTarget(){

  }
  function closeWalkthrough(){
    props.setWalkthrough(false);
    props.currentUser.walkthrough = true;
    props.patchUser(props.currentUser);
  }
  const currentItem = list[step]
  return ReactDOM.createPortal(
    <>
      <div className='overlay'></div>
      <Message closeWalkthrough={closeWalkthrough} message={currentItem.message} header = {currentItem.header} step={step} nextStep={nextStep} style={currentItem.style} target={currentItem.target}/>
    </>
  , document.getElementById('portal'))
}

const mapStateToProps = (state) => ({
  currentUser: state.session.user
})

const mapDispatchToProps = (dispatch) => ({
  patchUser: (userData) => dispatch(patchUser(userData))
})

export default connect(mapStateToProps, mapDispatchToProps)(Walkthrough)
