import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <>
      <div>This is the home page ✨</div>
      <Link to='/user/exampleid'>
        <h1>example user page</h1>
      </Link>
    </>
  )
}

export default Home
