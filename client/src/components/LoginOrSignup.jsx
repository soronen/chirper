import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import LoginForm from './LoginForm'

function LoginOrSignup() {
  const location = useLocation()
  const [loginPopupVisible, setLoginPopupVisible] = useState(false)

  const toggleLogin = (e) => {
    e.target.style.backgroundColor = '#c026d3'
    console.log('toggle', loginPopupVisible)
    loginPopupVisible ? setLoginPopupVisible(false) : setLoginPopupVisible(true)
  }

  return (
    <>
      <button
        onClick={toggleLogin}
        className='rounded-lg p-2 hover:bg-violet-400'
        style={{ backgroundColor: loginPopupVisible ? '#a78bfa' : '' }}
      >
        Login
      </button>
      <Link
        to='/register'
        className='rounded-lg p-2 hover:bg-violet-400'
        style={{
          backgroundColor: location.pathname === '/register' ? '#a78bfa' : '',
        }}
      >
        <h1>Sign up</h1>
      </Link>
      <div
        className='absolute top-16 right-4 shadow-xl'
        style={{ visibility: loginPopupVisible ? 'visible' : 'hidden' }}
      >
        <LoginForm></LoginForm>
      </div>
    </>
  )
}

export default LoginOrSignup
