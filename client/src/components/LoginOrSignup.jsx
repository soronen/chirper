import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import LoginForm from './LoginForm'

function LoginOrSignup() {
  const [loginPopupVisible, setLoginPopupVisible] = useState(false)

  const toggleLogin = () => {
    console.log('toggle', loginPopupVisible)
    loginPopupVisible ? setLoginPopupVisible(false) : setLoginPopupVisible(true)
  }

  return (
    <>
      <button onClick={toggleLogin}>Login</button>
      <Link to='/register' className=''>
        <h1>Sign up</h1>
      </Link>
      <div
        className='absolute top-14 right-4'
        style={{ visibility: loginPopupVisible ? 'visible' : 'hidden' }}
      >
        <LoginForm></LoginForm>
      </div>
    </>
  )
}

export default LoginOrSignup
