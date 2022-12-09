import React, { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'

function NewChirp({posts, setPosts}) {
  const { user } = useAuthContext()
  const [chirp, setChirp] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const body = {
      jwt: user.jwt,
      content: chirp
    }
    console.log(body);

    if (chirp.length > 280) {
      alert('Posts must be fewer than 280 characters!')
    }
    const response = await fetch('/chirp', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const json = await response.json()
    console.log('json response', json)


    if (!response.ok) {
      console.log('not okay', response)
    }
    if (response.ok) {
      setChirp('')
      console.log("posts" , posts)
      setPosts([json, ...posts])
      console.log("posts set" , posts)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col bg-violet-400 text-white p-4 rounded-lg shadow-lg w-5/6 max-w-2xl mb-10 h-72'>
      <h3 className='text-2xl font-bold pb-2'>Create a new post:</h3>
      <textarea
        className='text-black resize-none autofill:no rounded-lg p-2 flex-grow'
        type='text'
        onChange={(e) => setChirp(e.target.value)}
        value={chirp}
      />
      <div className='flex justify-between items-end'>
        <div>
          <h1 className='font-bold pt-2 pb-1'>Attach a picture:</h1>
          <input
            type='file'
            accept='image/png, image/gif, image/jpeg'
            className='block w-full text-sm text-white file:mr-2 file:py-2 file:px-2 file:rounded-full file:border-0 file:text-xs file:font-semibold 
          file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100'
          />
        </div>

        <button
          type='submit'
          className='bg-pink-700 hover:bg-pink-500 mt-3 p-3  rounded-md w-2/5'>
          Send
        </button>
      </div>
    </form>
  )
}

export default NewChirp
