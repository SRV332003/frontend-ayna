import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'
import Login from './pages/login';
import Register from './pages/register';
import {PrimaryButton, SecondaryButton } from './components/Button';
import Chat from './pages/chat';
import AccountModal from './components/AccountModal';
import Logout from './pages/logout';
import Navbar from './components/navbar';
import { AuthProvider } from './context/AuthContext';

// const router = createBrowserRouter([
//   {
//     path: "/login",
//     element: <Login />,
//   },
//   {
//     path: "/register",
//     element: <Register />,
//   },
//   {
//     path: "/",
//     element: <Chat />,
//   },
//   {
//     path: "/chat",
//     element: <Chat />,
//   },
// ]);


function App() {  
  return (
    <AuthProvider>
      <Router>
      <div className='w-screen h-screen flex flex-col bg-slate-100'>
        <Navbar />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/' element={<Chat />} />
          <Route path='/chat' element={<Chat />} />
          <Route path='/logout' element={<Logout/>} />
        </Routes>
        <AccountModal />
      </div>
      </Router>
    </AuthProvider>
  )
}

export default App
