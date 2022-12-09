import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function Footer() {
  const location = useLocation()
  return (
    <header>
      <footer className='bg-indigo-500 text-white h-20 text-lg flex flex-row justify-between items-center px-4 gap-6'>
        <Link
          to='/contact'
          className='rounded-lg p-2 hover:bg-violet-400'
          style={{
            backgroundColor: location.pathname === '/contact' ? '#a78bfa' : '',
          }}
          onClick={window.scrollTo(0, 0)}
        >
          <h1>Contact Us</h1>
        </Link>
        <h1 className='rounded-lg p-2 text-sm'>
          Chirper™️ All rights reserved.
        </h1>
      </footer>
    </header>
  )
}

export default Footer
