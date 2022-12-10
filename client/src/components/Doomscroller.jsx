import React, { useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import Chirp from './Chirp'

// robot wrote this 🤖
const Doomscroller = () => {
  const [page, setPage] = React.useState(1)
  const [items, setItems] = React.useState([])
  const [hasMore, setHasMore] = React.useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/chirps')
      const json = await response.json()
      const reversedJson = json.reverse()
      setItems(reversedJson)
    }
    fetchPosts()
  }, [])

  const fetchMoreData = () => {
    // increment the page number
    const nextPage = page + 1
    setPage(nextPage)

    // make a GET request to the server to fetch the next page of items
    fetch(`/chirps?page=${nextPage}`)
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
      <InfiniteScroll className=''
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={hasMore}>
        {items.map((post) => (
          <Chirp
            key={post._id}
            content={post.content}
            username={post.username}
            likes={post.likes}
            time={post.updatedAt}></Chirp>
        ))}
      </InfiniteScroll>
    </ul>
  )
}

export default Doomscroller
