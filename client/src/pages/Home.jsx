import React, { useState, useEffect } from 'react'
import Chirp from '../components/Chirp'
import NewChirp from '../components/NewChirp'
import { useAuthContext } from '../hooks/useAuthContext'

function Home() {
  const [posts, setPosts] = useState([])
  const { user } = useAuthContext()

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/chirps')
      const json = await response.json()
      const reversedJson = json.reverse()
      setPosts(reversedJson)
    }
    fetchPosts()
  }, [])

  return (
    <div className='pb-20'>
      <div className='text-5xl font-extrabold text-violet-800 text-center py-16'>
        Home page 🐦
      </div>
      <div className='flex flex-col items-center'>
        {user && <NewChirp posts={posts} setPosts={setPosts}></NewChirp>}

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
