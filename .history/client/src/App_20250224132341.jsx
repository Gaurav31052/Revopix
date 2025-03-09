import React from 'react'
import Home from './pages/Home'
import BuyCredit from './pages/BuyCredit'
import Result from './pages/Result'
import { Routes } from 'react-router-dom'

const App = () => {




  return (
    <div>
    <Routes
       <Home/>
       <BuyCredit/>
       <Result/>
    </div>
  )
}

export default App
