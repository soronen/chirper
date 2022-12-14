import React from 'react'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'

// pages
import Home from './pages/Home'
import Signup from './pages/Signup'

// components
import Navbar from './components/Navbar'

// pages
import NotFound from './pages/NotFound'
import Profile from './pages/Profile'
import User from './pages/User'
import Footer from './components/Footer'
import About from './pages/About'

import { useAuthContext } from './hooks/useAuthContext'

function App() {
  const { user } = useAuthContext()

  return (
    <div className='bg-indigo-500 min-h-screen flex flex-col'>
      <HashRouter basename='/'>
        <Navbar></Navbar>
        <div className='min-h-full flex-grow bg-violet-200'>
          <Routes>
            <Route path='/' element={<Home></Home>}></Route>
            <Route path='/profile' element={<Profile></Profile>}></Route>
            <Route path='/user/:id' element={<User></User>}></Route>
            <Route path='/register' element={!user ? <Signup /> : <Navigate to="/" />}></Route>
            <Route path='/about' element={<About></About>}></Route>
            <Route path='/*' element={<NotFound></NotFound>}></Route>
          </Routes>
        </div>
        <Footer className='absolute bottom-0'></Footer>
      </HashRouter>
    </div>
  )
}

export default App
