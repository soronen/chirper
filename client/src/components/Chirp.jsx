import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { useAuthContext } from '../hooks/useAuthContext'

function Chirp({ content, username, impressions, time, postid, loggedUser, images }) {
  const { user } = useAuthContext()
  const apiUrl = process.env.REACT_APP_API_URL

  const [likes, setLikes] = useState(impressions)

  const whoLiked = () => {
    if (!Array.isArray(likes)) {
      return likes
    }

    // console.log('inc?', likes.includes(loggedUser), likes, 'usr', loggedUser)
    if (likes.includes(loggedUser)) {
      return likes.length > 1
        ? `You and ${likes.length - 1} others liked this`
        : 'You liked this'
    }
    if (likes.length === 0) {
      return '0'
    }
    if (likes.length === 1) {
      return likes + ' liked this'
    }

    if (likes.length <= 3) {
      return likes.slice(0, -1).join(', ').concat(' and ' + likes.slice(-1)) + ' liked this'

    }
    if (likes.length > 3) {
      return likes.join(', ') + ` and ${likes.length-3} others liked this`
    }
  }

  const like = async () => {
    // router.patch('/like', auth, like)

    const body = {
      jwt: user.jwt,
      postid,
    }
    console.log(body)

    const response = await fetch(apiUrl + '/posts/like/', {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      console.log('not okay', response)
    }
    if (response.ok) {
      console.log('okay', response)
      if (likes.includes(loggedUser)) {
        const newLikes = likes.filter((element) => element !== loggedUser)
        setLikes(newLikes)
      }
      if (!likes.includes(loggedUser)) {
        setLikes([...likes, loggedUser])
      }
    }
  }

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
      <div className='py-3 border-t-4 border-b-4 border-violet-200' >
      <p className='pb-5'>{content}</p>
      {images[0] !== undefined && <img className='border-4 border-violet-300 rounded-lg max-h-64' src={images[0]}/>}
      </div>
      <div className='flex justify-between pt-1'>
        <button className='text-xl p-1 rounded-lg hover:bg-violet-500 hover:text-white'>
          0💬
        </button>
        <div className='flex'>
          <p className='self-center text-md mr-2'>{whoLiked()}</p>
          <button
            className='text-2xl rounded-lg px-2 bg-violet-300 hover:bg-violet-500 hover:text-white'
            onClick={like}>
            💖
          </button>
        </div>
      </div>
    </div>
  )
}

export default Chirp
