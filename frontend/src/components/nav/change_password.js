import React, { useState } from 'react'

export default function ChangePasswordModal(props) {
  const [credentials, setCredentials] = useState({
    email: null,
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  function handleSubmit(){

  }
  
  if(!props.open) return null;
  const fields = ["email", "currentPassword", "newPassword", "confirmPassword"].map(field => 
    <div className="form-field" key={field}>
      <label htmlFor="">{field.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); })}</label>
      <input type="text" onChange={(e) => setCredentials({...credentials, [field]: e.target.value})}/>
    </div>
    )
  return (
    <>
      <div onClick={() => props.onClose()} className="overlay"></div>

      <div className="modal-menu">
        <div className="header">
          Change Password
        </div>

        {fields}

        <button id="change-pass-btn" onClick={() => console.log(credentials)}>Submit</button>
      </div>
    </>
  )
}
