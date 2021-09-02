import React, { useState, useEffect } from 'react'

export default function ChangePasswordModal(props) {
  const [credentials, setCredentials] = useState({
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({})

  function close(){
    props.onClose();
    setErrors({});
  }

  function handleSubmit(){
    props.updatePassword(credentials).then(data => {
      if(data === 'success'){
        close();
      } else {
        setErrors(data.errors)
      }
    })
  }

  if(!props.open) return null;
  const fields = ["email", "currentPassword", "newPassword", "confirmPassword"].map(field => 
    <div className="form-field" key={field}>
      {errors[field] ? <p className="pass-errors">{errors[field]}</p> : null}
      <label htmlFor="">{field.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); })}</label>
      <input type={field === "email" ? "text" : "password"} onChange={(e) => setCredentials({...credentials, [field]: e.target.value})}/>
    </div>
    )
  return (
    <>
      <div onClick={close} className="overlay"></div>

      <div className="modal-menu">
        <div className="header">
          Change Password
        </div>

        {fields}

        <button id="change-pass-btn" onClick={handleSubmit}>Submit</button>
      </div>
    </>
  )
}
