import React from 'react'
import Header from '../components/Header'
import Steps from '../components/Steps'
import GenerateBtn from '../components/GenerateBtn'
import SplashCursor from '../components/SplashCursor'
import Example from '../components/Example'
import { useLocation } from 'react-router-dom'
const Home = () => {

const isLoginPage = location.pathname === "/login";
  return (
    <div>
       {!isLoginPage && <SplashCursor />}
      <Header/>
      <Steps/>
      <Example/>
      <GenerateBtn/>
    </div>
  )
}

export default Home
