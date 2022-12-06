import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import LoginForm from './LoginForm'
import { useLocation } from 'react-router-dom'


function LoginOrSignup() {
  const location = useLocation()
  const [loginPopupVisible, setLoginPopupVisible] = useState(false)

  const toggleLogin = () => {
    console.log('toggle', loginPopupVisible)
    loginPopupVisible ? setLoginPopupVisible(false) : setLoginPopupVisible(true)
  }

  return (
    <>
      <button onClick={toggleLogin} className='rounded-lg p-2 hover:bg-violet-500' style={{ 'backgroundColor': loginPopupVisible ? '#8b5cf6' : '' }}>Login</button>
      <Link to='/register' className='rounded-lg p-2 hover:bg-violet-500' style={{ 'backgroundColor': location.pathname === '/register' ? '#8b5cf6' : '' }}>
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
