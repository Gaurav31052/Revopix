import React from 'react'
import { assets } from '../assets/assets'
const Card = () => {
  return (
    <div className='flex justify-center items-center h-auto w-fit bg-white/40 border-2'>
      <img width={300} src= {assets.sample_img_1} alt=''/>
      <div><p></p></div>
    </div>
  )
}

export default Card
