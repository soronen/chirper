import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

function Chirp({content, username, likes, time}) {

  const date = new Date(time)
  // console.log('momentous', moment(date).fromNow());

  return (
    <div className='bg-white text-black rounded-lg p-2 my-4 shadow-lg'>
      <div className='flex justify-between pb-2'>
        <Link to='/user/exampleid' className='hover:underline'>
          <h1>{username}</h1>
        </Link>
        <h1>{moment(date).fromNow()}</h1>
      </div>
      <p className='py-3 border-t-4 border-b-4 border-violet-200'>
        {content}
      </p>
      <div className='flex justify-between pt-1'>
        <button className='text-xl p-1 rounded-lg hover:bg-violet-500 hover:text-white'>
          12💬
        </button>
        <button className='text-xl p-1 rounded-lg hover:bg-violet-500 hover:text-white'>
          {likes}💖
        </button>
      </div>
    </div>
  )
}

export default Chirp
