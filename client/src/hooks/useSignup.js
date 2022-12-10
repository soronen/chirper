import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

// const API_URL=process.env.REACT_APP_API_URL;

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const signup = async (username, password) => {
    setIsLoading(true)
    setError(null)

    console.log('1');

    const response = await fetch('/register', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ username, password })
    })
    const json = await response.json()

    console.log('2');

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
      console.log('3.5');
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))

      // update the auth context
      dispatch({type: 'LOGIN', payload: json})

      // update loading state
      setIsLoading(false)
      console.log('3');

    }
    console.log('4');

  }

  return { signup, isLoading, error }
}