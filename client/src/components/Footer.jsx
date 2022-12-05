import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'



function Footer() {
  const location = useLocation()
  return (
    <header>
    <div className='bg-violet-700 text-white h-14 text-lg flex flex-row justify-between items-center px-4 gap-6'>
        <Link to='/about' className='rounded-lg p-2 hover:bg-violet-500' style={{ 'backgroundColor': location.pathname === '/about' ? '#8b5cf6' : '' }} onClick={window.scrollTo(0, 0)}>
          <h1>Contract Us</h1>
        </Link>
        <h1 className='rounded-lg p-2'>Chirper™️ All rights reserved.</h1>
    </div>
  </header>
  )
}

export default Footer