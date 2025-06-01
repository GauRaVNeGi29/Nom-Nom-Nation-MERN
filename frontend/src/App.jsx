import React, { useState } from 'react'
import './index.css'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Home from './pages/Home/Home'
import NavBar from './components/NavBar/NavBar'
import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Verify from './pages/Verify/Verify'
import MyOrders from './pages/MyOrders/MyOrders'

const App = () => {

  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
      <div className='app'>
        <NavBar setShowLogin={setShowLogin}/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/order" element={<PlaceOrder/>} />
          <Route path="/verify" element={<Verify/>} />
          <Route path="/myorders" element={<MyOrders/>} />
          <Route path="*" element={<h1 style={{ textAlign: 'center', marginTop: '50px' }}>Error 404 - Page Does Not Exist</h1>} />
        </Routes>
      </div>
      <Footer/>
    </>
  )
}

export default App