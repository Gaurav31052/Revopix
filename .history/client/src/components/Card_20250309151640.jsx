import React from 'react'
import { assets } from '../assets/assets'
const Card = () => {
  return (
    <div className='flex justify-center items-center h-20 w-32 bg-wh'>
      <img src= {assets.sample_img_1} alt=''/>
      <div><p></p></div>
    </div>
  )
}

export default Card
