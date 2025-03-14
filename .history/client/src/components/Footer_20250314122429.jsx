import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
 
  return (
    <div className='flex items-center justify-between gap-4 py-3 mt-20'>
    <img src={assets.logo1} alt='' width={150}/>
    <p className='flex-1 border-l-2 items-center border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden'>Copyright @RevoPix.dev | All right reserved. | <Link to= '/disclaimer'> Disclaimer</Link> | <Link to= '/disclaimer'> Term</Link></p>
    <div className='flex gap-2 '>
        <img src={assets.facebook_icon} alt='' width={35} />
        <img src={assets.twitter_icon} alt='' width={35} />
        <img src={assets.instagram_icon} alt='' width={35} />
    </div>
      
    </div>
  )
}

export default Footer

