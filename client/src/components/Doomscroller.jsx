import React, { useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useAuthContext } from '../hooks/useAuthContext'
import jwtDecode from 'jwt-decode'

import Chirp from './Chirp'

const apiUrl = process.env.REACT_APP_API_URL
console.log(apiUrl)

// robot wrote this 🤖
const Doomscroller = ({ items, setItems }) => {
  const [page, setPage] = React.useState(1)
  const [hasMore, setHasMore] = React.useState(true)

  const { user } = useAuthContext()
  let username = "null"
  if (user !== null && user.jtw !== null) {
    username = jwtDecode(user.jwt).username
    console.log('username of doom ', username);
  }

  useEffect(() => {
    const fetchPosts = async () => {
      let response = null

      if (user) {
        response = await fetch(apiUrl + '/posts/getAll', {
          method: 'GET',
          // body: JSON.stringify({jwt: user.jwt}),
          headers: {
            'Content-Type': 'application/json',
          },
        })
      }
      if (!user) {
        response = await fetch(apiUrl + '/posts/getAll')
      }

      const json = await response.json()
      // const reversedJson = json.reverse()
      setItems(json)
    }
    fetchPosts()
  }, [])

  const fetchMoreData = () => {
    // increment the page number
    const nextPage = page + 1
    setPage(nextPage)

    // make a GET request to the server to fetch the next page of items
    fetch(apiUrl + `/posts/getAll?page=${nextPage}`)
      .then((res) => res.json())
      .then((newItems) => {
        // add the new items to the list
        setItems([...items, ...newItems])

        // set hasMore to false when there are no more items to fetch
        if (newItems.length === 0) {
          setHasMore(false)
        }
      })
    console.log('items', items)
  }
  return (
    <ul className='w-full max-w-3xl'>
      <InfiniteScroll
        className=''
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={hasMore}>
        {items.map((post) => (
          <Chirp
            postid={post._id}
            key={post._id}
            content={post.content}
            username={post.username}
            impressions={post.likes}
            time={post.updatedAt}
            loggedUser={username}></Chirp>
        ))}
      </InfiniteScroll>
    </ul>
  )
}

export default Doomscroller
