import React from 'react'
import './index.css'
import { Route, Routes, Navigate } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import SideBar from './components/SideBar/SideBar'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer/Footer'

const App = () => {

  const url = "https://nom-nom-nation-mern-backend.onrender.com"

  return (
    <div className='app-wrapper'>
      <ToastContainer/>
      <NavBar/>
      <hr />
      <div className="app-component app-content">
        <SideBar/>
          <Routes>
            <Route path="/" element={<Navigate to="/add" />} />
            <Route path="/add" element={<Add url={url} />} />
            <Route path="/list" element={<List url={url} />} />
            <Route path="/orders" element={<Orders url={url} />} />
            <Route path="*" element={<div>404 - Page Not Found</div>} />
          </Routes>
      </div>
      <Footer/>
    </div>
  )
}

export default App 
