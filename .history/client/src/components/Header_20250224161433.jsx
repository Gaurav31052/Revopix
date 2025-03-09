import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className='flex '>
      <div>
      <p>Best text to image generator</p>
      <img src={assets.star_icon} alt=''/>
      </div>
    </div>
  )
}

export default Header
