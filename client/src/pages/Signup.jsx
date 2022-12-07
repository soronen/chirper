import React, { useState } from 'react'

function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handlesubmit = () => {}

  return (
    <div className='min-w-full'>
      <h1 className='text-5xl font-extrabold text-violet-800 py-16 text-center'>
        ✨Sign up today for free✨
      </h1>
      <div className=' flex flex-col items-center'>
        <form
          onSubmit={handlesubmit}
          className='flex flex-col bg-violet-400 text-white p-4 rounded-lg w-5/6 max-w-2xl shadow-xl'
        >
          <h3 className='text-2xl font-bold pb-4'>Register</h3>
          <label className='pb-1'>Username: </label>
          <input
            className='text-black rounded-md p-1'
            type='email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <label className='pb-1 pt-4'>Password: </label>
          <input
            className='text-black rounded-md p-1'
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <label className='pb-1 pt-4'>Retype password: </label>
          <input
            className='text-black rounded-md p-1'
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button className='bg-pink-700 hover:bg-pink-500 mt-10 p-6 rounded-md text-xl font-bold'>
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default Signup
