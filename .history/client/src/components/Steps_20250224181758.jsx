import React from 'react'
import { assets, stepsData } from '../assets/assets'

const Steps = () => {
  return (
    <div className='flex flex-col justify-center items-center text-center my-20'>
      <div>
        <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>How it works</h1>
        <p className='text-lg text-neutral-600 mb-8'>Transform Words Into Stunning Images</p>
      </div>


      {stepsData.map((item, index)=>(
        <div key={index} className='flex justify-center gap-2 mb-3 max-w-fit border m-6'>
        <img src={item.icon} alt=''/>
        <div className='flex flex-col items-start'>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
        </div>
      </div>
            
      ))}

    </div>
  )
}

export default Steps
