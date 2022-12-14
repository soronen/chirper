import React from 'react'
import ProfileInfo from '../components/ProfileInfo'
import { useAuthContext } from '../hooks/useAuthContext'

function Profile() {
  const { user } = useAuthContext()

  return (
    <>
    {user ? (<ProfileInfo></ProfileInfo>) : <h1>Not logged in</h1>}
    </>
  )
}

export default Profile
