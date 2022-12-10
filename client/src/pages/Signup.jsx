import React, { useState } from 'react'
import { useSignup } from '../hooks/useSignup'

function Signup() {
  const { signup, error, isLoading } = useSignup()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordAgain, setPasswordAgain] = useState('')

  const handlesubmit = async (e) => {
    e.preventDefault()
    console.log('register pressed')
    await signup(username, password)
  }

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
            type='text'
            onChange={(e) => setUsername(e.target.value)}
            value={username}
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
            onChange={(e) => setPasswordAgain(e.target.value)}
            value={passwordAgain}
          />
          <button
            className='bg-pink-700 hover:bg-pink-500 mt-10 p-6 rounded-md text-xl font-bold disabled:bg-pink-500'
            disabled={isLoading}
          >
            Submit
          </button>
        </form>
      </div>
      {error && <div className='error'>{error}</div>}
    </div>
  )
}

export default Signup
