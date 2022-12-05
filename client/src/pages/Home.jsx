import React from 'react'
import { Link } from 'react-router-dom'
import Chirp from '../components/Chirp'

function Home() {
  return (
    <div className='pb-20'>
      <div className='text-5xl font-extrabold text-violet-800 text-center py-16'>Home page 🐦</div>

      <ul className='flex flex-col items-center'>
        <Chirp></Chirp>
        <Chirp></Chirp>
      </ul>
    </div>
  )
}

export default Home
