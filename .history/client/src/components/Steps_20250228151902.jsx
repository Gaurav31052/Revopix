import React from 'react'
import { assets, stepsData } from '../assets/assets'
import 
const Steps = () => {
  return (
    <div className='flex flex-col justify-center items-center text-center my-32'>
     
        <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>How it works</h1>
        <p className='text-lg text-neutral-600 mb-8'>Transform Words Into Stunning Images</p>
      

    <div className=' space-y-4 w-full max-w-3xl text-sm'>
      {stepsData.map((item, index)=>(
        <div key={index} className='flex items-center gap-2 mb-3 border-transparent shadow-2xl rounded-lg m-6 p-6 bg-white/70 cursor-pointer hover:scale-[1.02] transition-all duration-300'>
        <img src={item.icon} alt=''/>
        <div className='flex flex-col items-start'>
            <h2 className='text-xl font-medium'>{item.title}</h2>
            <p className=' text-sm text-neutral-600'>{item.description}</p>
        </div>
      </div>
            
      ))}

      </div>

    </div>
  )
}

export default Steps
