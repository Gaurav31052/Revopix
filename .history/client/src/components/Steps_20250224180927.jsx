import React from 'react'
import Card from './Card'
import { assets, stepsData } from '../assets/assets'

const Steps = () => {
  return (
    <div>
      <div>
        <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>How it works</h1>
        <p className='text-lg text-neutral-600 mb-8'>Transform Words Into Stunning Images</p>
      </div>


      {stepsData.map((item, index)=>(
        <div key={index}>
        <img src={item.icon} alt=''/>
        <div>
            <h2>{itemtitle}</h2>
            <p>{description}</p>
        </div>
      </div>
            
      ))}

    </div>
  )
}

export default Steps
