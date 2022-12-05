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

function App() {

  return (
    <div className=' bg-violet-200 min-h-screen flex flex-col'>
      <HashRouter basename='/'>
        <Navbar></Navbar>
        <div className='min-h-full flex-grow'>
          <Routes>
            <Route path='/' element={<Home></Home>}></Route>
            <Route path='/profile' element={<Profile></Profile>}></Route>
            <Route path='/user/:id' element={<User></User>}></Route>
            <Route path='/register' element={<Signup></Signup>}></Route>
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
