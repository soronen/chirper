import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

// components
import LoginForm from './LoginForm'
import LoginOrSignup from './LoginOrSignup'


function Navbar() {
  const location = useLocation();
  console.log(location.pathname)
  
  const [loggedIn, setLoggedIn] = useState(true)
  const [loginPopupVisible, setLoginPopupVisible] = useState(false)

  const toggleLogin = () => {
    console.log('toggle', loginPopupVisible)
    loginPopupVisible ? setLoginPopupVisible(false) : setLoginPopupVisible(true)
  }

  const toggleLogOut = () => {
    window.confirm('Are you sure you want to log out?') ? setLoggedIn(false) : setLoggedIn(true)
  }

  return (
    <header>
      <div className='bg-violet-700 text-white h-14 text-lg flex flex-row justify-between items-center px-4'>
        <div className='flex gap-6'>
          <Link to='/' className='rounded-lg p-2 hover:bg-violet-500' style={{ 'backgroundColor': location.pathname === '/' ? '#8b5cf6' : '' }}>
            <h1>Home</h1>
          </Link>
          <Link to='/profile' className='rounded-lg p-2 hover:bg-violet-500' style={{ 'backgroundColor': location.pathname === '/profile' ? '#8b5cf6' : '' }}>
            <h1>Profile</h1>
          </Link>
        </div>
        <div className='flex flex-row gap-6'>
          {loggedIn ? (
            <button onClick={toggleLogOut} className='rounded-lg p-2 hover:bg-violet-500'>Log out</button>
          ) : (
            <LoginOrSignup></LoginOrSignup>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
