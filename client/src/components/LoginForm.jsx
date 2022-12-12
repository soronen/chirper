import React, { useState } from 'react'
import { useLogin } from '../hooks/useLogin'

function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { login, error, isLoading } = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('login pressed')
    if(!username || !password) return alert('Please fill in all fields.')

    await login(username, password)
  }

  return (
    <form
      onSubmit={handleSubmit}
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
        disabled={isLoading}
        type='submit'
        className='bg-pink-700 hover:bg-pink-500 mt-3 p-2 rounded-md disabled:bg-pink-500'
      >
        Log in
      </button>
      {error && <div className='error'>{error}</div>}
    </form>
  )
}

export default LoginForm
