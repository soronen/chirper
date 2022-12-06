import React from 'react'
import { Link } from 'react-router-dom'

function Chirp() {
  return (
    <div className='bg-white text-black rounded-lg p-2 m-2 shadow-xl w-5/6 max-w-2xl'>
      <div className='flex justify-between pb-2'>
        <Link to='/user/exampleid' className='hover:underline'>
          <h1>User @user</h1>
        </Link>
        <h1>2:30pm</h1>
      </div>
      <p className='py-2 border-t-4 border-b-4 border-violet-200'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, iusto
        exercitationem esse ipsam quasi rerum unde corrupti distinctio!
        Cupiditate molestiae dolor ducimus sit quibusdam tenetur facere
        molestias harum delectus veniam!
      </p>
      <div className='flex justify-between pt-1'>
        <button className='text-xl p-1 rounded-lg hover:bg-violet-500 hover:text-white'>
          12💬
        </button>
        <button className='text-xl p-1 rounded-lg hover:bg-violet-500 hover:text-white'>
          4💖
        </button>
      </div>
    </div>
  )
}

export default Chirp
