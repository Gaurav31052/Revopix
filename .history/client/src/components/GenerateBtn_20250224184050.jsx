import React from 'react'
import { assets } from '../assets/assets'

const GenerateBtn = () => {
  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-4xl sm:text-6xl font'>See the magic. Try now</h1>
      <button className='sm:text-lg text-white bg-black w-auto mt-8 px-12 py-2.5 flex items-center gap-2 rounded-full'>Generate Images
            <img className=' h-6' src={assets.star_group} alt=''/></button>
    </div>
  )
}

export default GenerateBtn
