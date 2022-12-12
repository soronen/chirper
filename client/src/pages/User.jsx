import React from 'react'
import { useParams } from 'react-router-dom'
import UserInfo from '../components/UserInfo'
function User() {
  const { id } = useParams()

  return (
    <UserInfo nameOfUser={id}></UserInfo>
  )
}
export default User
