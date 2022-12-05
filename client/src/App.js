import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// pages
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'

// components
import Navbar from './components/Navbar'

function App() {
  const { user } = useAuthContext()

  return (
    <div className='App'>
      <HashRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/login" element={user ? <Home /> : <Navigate to="/login" />} ></Route>
          <Route path="/register" element={user ? <Home /> : <Navigate to="/register" />} ></Route>
        </Routes>
      </HashRouter>
      <Home></Home>
      <Login></Login>
      <Signup></Signup>
    </div>
  )
}

export default App
