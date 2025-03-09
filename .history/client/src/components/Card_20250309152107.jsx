import React from 'react'
import { assets } from '../assets/assets'
const Card = () => {
  return (
    <div className='flex justify-center items-center h-auto w-fit bg-white/40 border-2'>
      <img width={300} src= {assets.Example7} alt=''/>
      <div> Example : <p>You are a young Asian lady on an LSD trip within your DNA, unveiling all the individuals contributed to your existence. You are to observe aspects of their lives in high definition. Trippy, surreal, and executed in a manner only AI can achieve.</p></div>
    </div>
  )
}

export default Card
