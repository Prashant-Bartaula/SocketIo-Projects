import React, { useEffect } from 'react'
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'
import HomePage from './pages/HomePage'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import { useAuthStore } from './store/useAuthStore'

export default function App() {

const {authUser, checkAuth, isCheckingAuth}=  useAuthStore();

useEffect(()=>{
  checkAuth();
}, [])//run everytime on refresh

console.log(authUser);

if(isCheckingAuth && !authUser) return (<div>Loading...</div>)

  return (
    <>
    <Router>
      <Routes>
        <Route path='/'  element={authUser? <HomePage/>:<Navigate to='/login'/>} />
        <Route path='/signup'  element={!authUser?<SignUp/>:<Navigate to='/'/>} />
        <Route path='/login'  element={!authUser?<Login/>:<Navigate to='/'/>} />
      </Routes>
    </Router>
    </>
  )
}
