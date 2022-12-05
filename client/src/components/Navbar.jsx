import React, { useState } from 'react'
import { Link } from 'react-router-dom'

// components
import LoginForm from './LoginForm'
import LoginOrSignup from './LoginOrSignup'

function Navbar() {
  const [loggedIn, setLoggedIn] = useState(true)
  const [loginPopupVisible, setLoginPopupVisible] = useState(false)

  const toggleLogin = () => {
    console.log('toggle', loginPopupVisible)
    loginPopupVisible ? setLoginPopupVisible(false) : setLoginPopupVisible(true)
  }

  const toggleLogOut = () => {
    loggedIn ? setLoggedIn(false) : setLoggedIn(true)
  }

  return (
    <header>
      <div className='bg-violet-700 text-white h-12 text-lg flex flex-row justify-between items-center px-4'>
        <div className='flex gap-4'>
          <Link to='/'>
            <h1>Home</h1>
          </Link>
          <Link to='/'>
            <h1>Profile</h1>
          </Link>
        </div>
        <div className='flex flex-row gap-4'>
          {loggedIn ? (
            <button onClick={toggleLogOut}>Log out</button>
          ) : (
            <LoginOrSignup></LoginOrSignup>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
