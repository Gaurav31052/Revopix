import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='flex items-center justify-between gap-4 py-3 mt-20'>
    <img src={assets.logo} alt='' width={150}/>
    <p>Copyright @RevoPix.dev | All right reserved.</p>
    <div></div>
      
    </div>
  )
}

export default Footer

