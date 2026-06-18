import React, { useContext } from 'react'
import Home from './pages/Home'
import BuyCredit from './pages/BuyCredit'
import Result from './pages/Result'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './components/Login'
import { AppContext } from './context/AppContext'

import { ToastContainer } from 'react-toastify';
import Disclaimer from './pages/Disclaimer'
import TermAndCondition from './pages/TermAndCondition'
import Privacy from './pages/Privacy'
import RefundAndCancellation from './pages/RefundAndCancellation'
import ContactUs from './pages/ContactUs'
import RemoveBackground from './pages/RemoveBackground'


const App = () => {

  const {showLogin} = useContext(AppContext);

  return (
    <div className='px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-gray-400 to-gray-50'>
    
    <ToastContainer position='bottom-right'/>
    <Navbar/>
    {showLogin && <Login/>}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<Result />} />
        <Route path="/remove-background" element={<RemoveBackground />} />
        <Route path="/buy" element={<BuyCredit />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/term-and-condition" element={<TermAndCondition />} />
        <Route path="/privacy-policy" element={<Privacy />} />
        <Route path="/refund-policy" element={<RefundAndCancellation />} />
        <Route path="/contact-us" element={<ContactUs />} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
