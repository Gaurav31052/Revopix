import React, { useContext } from 'react'
import Header from '../components/Header'
import Steps from '../components/Steps'
import GenerateBtn from '../components/GenerateBtn'
import SplashCursor from '../components/SplashCursor'
import Example from '../components/Example'

const Home = () => {

const { setShowLogin} = useContext(Ap)
  return (
    <div>
       {!setShowLogin && <SplashCursor />}
      <Header/>
      <Steps/>
      <Example/>
      <GenerateBtn/>
    </div>
  )
}

export default Home
