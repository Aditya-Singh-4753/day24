import React from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import CreatePost from './pages/CreatePost';

function App() {
  return (
    <BrowserRouter>
      <nav className='p-4 bg-black text-white flex gap-4'>
        <Link to="/">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/create">Create Post</Link>
      </nav>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/Dashboard' element={<Dashboard/>}/>
        <Route path='/create' element={<CreatePost/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;  