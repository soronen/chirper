import React, { useState, useEffect } from 'react'
import Chirp from '../components/Chirp'
import NewChirp from '../components/NewChirp'

function Home() {
  const [posts, setPosts] = useState([])
  console.log(posts, setPosts)

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/chirps')
      const json = await response.json()

      if (response.ok) {
        console.log(json)
        setPosts(json)
      }
    }
    fetchPosts()
  }, [])

  return (
    <div className='pb-20'>
      <div className='text-5xl font-extrabold text-violet-800 text-center py-16'>
        Home page 🐦
      </div>
      <div className='flex flex-col items-center'>
        <NewChirp></NewChirp>
        <ul className='flex flex-col items-center w-5/6 max-w-2xl'>
          {posts.map((post) => (
            <Chirp
              key={post._id}
              content={post.content}
              username={post.username}
              likes={post.likes}
              time={post.updatedAt}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Home
