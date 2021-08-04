import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import Message from './message'
import { patchUser } from '../../../../actions/session_actions';

const list = {
  0: {
    message: 'Follow the tour to learn about Wabbit or come back to the walkthrough later',
    header: 'Welcome!!!',
    target: 'body',
    style: {
      width: 350,
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    }
  }
}
export const Walkthrough = (props) => {
  const [step, setStep] = useState(0)
  const [target, setTarget] = useState(undefined) //used to target the specific element that will be highlighted

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
    props.patchUser(props.currentUser);
    props.setWalkthrough(false);
    props.currentUser.walkthrough = true;
    console.log(props.currentUser);
  }
  const currentItem = list[step]
  return ReactDOM.createPortal(
    <>
      <div className='overlay'></div>
      <Message closeWalkthrough={closeWalkthrough} patchUser={props.patchUser} currentUser={props.currentUser} message={currentItem.message} header = {currentItem.header} step={step} nextStep={nextStep} style={currentItem.style} target={currentItem.target}/>
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
