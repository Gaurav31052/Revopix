import React from 'react'
import Header from '../components/Header'
import Steps from '../components/Steps'
import GenerateBtn from '../components/GenerateBtn'
import SplashCursor from '../components/SplashCursor'
import Example from '../components/Example'

const Home = () => {

const {  const {setShowLogin} = useContext(AppContext)
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
