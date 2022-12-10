import React, { useState } from 'react'
import NewChirp from '../components/NewChirp'
import { useAuthContext } from '../hooks/useAuthContext'

import Doomscroller from '../components/Doomscroller'

function Home() {
  const [posts, setPosts] = useState([])
  const { user } = useAuthContext()



  return (
    <div className='pb-20 mx-10'>
      <div className='text-5xl font-extrabold text-violet-800 text-center py-16'>
        Home page 🐦
      </div>
      <div className='flex flex-col items-center'>
        {user && <NewChirp posts={posts} setPosts={setPosts}></NewChirp>}

        <Doomscroller items={posts} setItems={setPosts}></Doomscroller> 
      </div>
    </div>
  )
}

export default Home
