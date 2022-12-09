import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import jwtDecode from 'jwt-decode'

// components
import LoginOrSignup from './LoginOrSignup'

import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'

function Navbar() {
  const { user } = useAuthContext()
  const { logout } = useLogout()

  const username = jwtDecode(user.jwt).username

  const location = useLocation()
  console.log(location.pathname)

  // const [loggedIn, setLoggedIn] = useState(true)

  const toggleLogOut = () => {
    window.confirm('Are you sure you want to log out?')
      ? logout()
      : console.log('still logged in')
  }

  return (
    <header>
      <div className='bg-indigo-500 text-white h-14 text-lg flex flex-row justify-between items-center px-4'>
        <div className='flex gap-6'>
          <Link
            to='/'
            className='rounded-lg p-2 hover:bg-violet-400'
            style={{
              backgroundColor: location.pathname === '/' ? '#a78bfa' : '',
            }}
          >
            <h1>Home</h1>
          </Link>
          <Link
            to='/profile'
            className='rounded-lg p-2 hover:bg-violet-400'
            style={{
              backgroundColor:
                location.pathname === '/profile' ? '#a78bfa' : '',
            }}
          >
            <h1>Profile</h1>
          </Link>
        </div>
        <div className='flex flex-row gap-4'>
          {user ? (
            <>
              <h1 className='rounded-lg p-2' >Logged in as {username}</h1>
              <button
                onClick={toggleLogOut}
                className='rounded-lg p-2 hover:bg-violet-400'
              >
                Log out
              </button>
            </>
          ) : (
            <LoginOrSignup></LoginOrSignup>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
