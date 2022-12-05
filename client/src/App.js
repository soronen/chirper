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

function App() {

  return (
    <div className='App'>
      <HashRouter>
        <Navbar></Navbar>
        <div className='bg-purple-100 min-h-screen max-h'>
          <Routes>
            <Route path='/' element={<Home></Home>}></Route>
            <Route path='/profile' element={<Profile></Profile>}></Route>
            <Route path='/user/:id' element={<User></User>}></Route>
            <Route path='/register' element={<Signup></Signup>}></Route>
            <Route path='/*' element={<NotFound></NotFound>}></Route>
          </Routes>
        </div>
      </HashRouter>
    </div>
  )
}

export default App
