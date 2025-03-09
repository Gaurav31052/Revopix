import React from 'react'
import Home from './pages/Home'
import BuyCredit from './pages/BuyCredit'
import Result from './pages/Result'
import { Route, Routes } from 'react-router-dom'

const App = () => {




  return (
    <div>
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/buycredit" element={<BuyCredit />} />
    <Route path="/result" element={<Result />} />
      
       </Routes>
    </div>
  )
}

export default App
