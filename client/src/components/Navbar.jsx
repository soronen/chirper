import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import jwtDecode from 'jwt-decode'

// components
import LoginOrSignup from './LoginOrSignup'

import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'

function Navbar() {
  const { logout } = useLogout()
  
  const { user } = useAuthContext()
  let username = "null"
  try {
    if (user !== null && user.jtw !== null) {
      username = jwtDecode(user.jwt).username
      console.log('username: ', username);
    }
  } catch (error) {
    console.log(error)
  }

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
        <div className='flex gap-4'>



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

          <Link
            to='/about'
            className='rounded-lg p-2 hover:bg-violet-400'
            style={{
              backgroundColor:
                location.pathname === '/about' ? '#a78bfa' : '',
            }}
          >
            <h1>About</h1>
          </Link>

        </div>
        <div className='flex flex-row'>
          {user ? (
            <>
              <h1 className='rounded-lg p-2 mr-10' >Logged in as <strong>{username}</strong></h1>
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
