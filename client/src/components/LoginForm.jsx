import React from 'react'
import { useState } from 'react'

function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handlesubmit = () => {}

  return (
    <form
      onSubmit={handlesubmit}
      className='flex flex-col bg-violet-400 text-white p-3 rounded-lg'
    >
      <h3 className='text-2xl font-bold pb-2'>Log in</h3>
      <label>Username: </label>
      <input
        className='text-black rounded-md p-1'
        type='text'
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />
      <label className='pt-2'>Password: </label>
      <input
        className='text-black rounded-md p-1'
        type='password'
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button
        type='submit'
        className='bg-pink-700 hover:bg-pink-500 mt-3 p-2 rounded-md'
      >
        Log in
      </button>
    </form>
  )
}

export default LoginForm
