import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <header>
      <div className='bg-purple-700 text-white h-14'>
        <Link to='/' className=''>
          <h1>Home</h1>
        </Link>
      </div>
    </header>
  )
}

export default Navbar
