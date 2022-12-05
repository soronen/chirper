import React from 'react'
import { useState } from 'react'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handlesubmit = () => {}

  return (
    <form
      onSubmit={handlesubmit}
      className='flex flex-col bg-purple-400 text-white p-4 rounded-lg'
    >
      <h3 className='text-2xl font-bold pb-2'>Log in</h3>
      <label>Username: </label>
      <input
        className='text-black rounded-md p-1'
        type='email'
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label className='pt-2'>Password: </label>
      <input
        className='text-black rounded-md p-1'
        type='password'
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button className='bg-purple-600 hover:bg-purple-300 mt-2 p-2 rounded-md'>
        Log in
      </button>
    </form>
  )
}

export default LoginForm
