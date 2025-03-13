import React, { useContext } from 'react'
import Header from '../components/Header'
import Steps from '../components/Steps'
import GenerateBtn from '../components/GenerateBtn'
import SplashCursor from '../components/SplashCursor'
import Example from '../components/Example'
import { AppContext } from '../context/AppContext'

const Home = () => {

const { showLogin} = useContext(AppContext)
  return (
    <div>
       {!ShowLogin && <SplashCursor />}
      <Header/>
      <Steps/>
      <Example/>
      <GenerateBtn/>
    </div>
  )
}

export default Home
