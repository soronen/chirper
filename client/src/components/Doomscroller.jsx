import React, { useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useAuthContext } from '../hooks/useAuthContext'
import jwtDecode from 'jwt-decode'

import Chirp from './Chirp'

// robot wrote this 🤖
const Doomscroller = ({ items, setItems }) => {
  const [page, setPage] = React.useState(0)
  const [hasMore, setHasMore] = React.useState(true)

  const { user } = useAuthContext()
  let username = 'null'
  try {
    if (user !== null && user.jtw !== null) {
      username = jwtDecode(user.jwt).username
      console.log('username: ', username)
    }
  } catch (error) {
    console.log(error)
  }
  const apiUrl = process.env.REACT_APP_API_URL
  console.log(apiUrl)

  useEffect(() => {
    // increment the page number
    const nextPage = page + 1

    // make a GET request to the server to fetch the next page of items
    fetch(apiUrl + `/posts/getAll?page=${nextPage}`)
      .then((res) => res.json())
      .then((newItems) => {
        // add the new items to the list
        setItems([...items, ...newItems])
        setPage(nextPage)

        // set hasMore to false when there are no more items to fetch
        if (newItems.length === 0) {
          setHasMore(false)
        }
      })
      .catch(() => {
        setTimeout(() => {
          fetchMoreData()
        }, 3000)
      })
    console.log('items', items)
  }, [])

  const fetchMoreData = () => {
    // increment the page number
    const nextPage = page + 1

    // make a GET request to the server to fetch the next page of items
    fetch(apiUrl + `/posts/getAll?page=${nextPage}`)
      .then((res) => res.json())
      .then((newItems) => {
        // add the new items to the list
        setItems([...items, ...newItems])
        setPage(nextPage)

        // set hasMore to false when there are no more items to fetch
        if (newItems.length === 0) {
          setHasMore(false)
        }
      })
      .catch(() => {
        console.log('error connecting to backend, retying in 3 seconds')
        setTimeout(() => {
          fetchMoreData()
        }, 3000)
      })
    console.log('items', items)
  }
  return (
    <ul className='w-full max-w-3xl'>
      <InfiniteScroll className='' dataLength={items.length} next={fetchMoreData} hasMore={hasMore}>
        {items.map((post) => (
          <Chirp
            postid={post._id}
            key={post._id}
            images={post.images}
            content={post.content}
            username={post.username}
            impressions={post.likes}
            time={post.createdAt}
            loggedUser={username}></Chirp>
        ))}
      </InfiniteScroll>
    </ul>
  )
}

export default Doomscroller
