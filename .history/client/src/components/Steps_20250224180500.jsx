import React from 'react'
import Card from './Card'
import { assets } from '../assets/assets'

const Steps = () => {
  return (
    <div>
      <div>
        <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>How it works</h1>
        <p className='text-lg text-neutral-600 mb-8'>Transform Words Into Stunning Images</p>
      </div>

      {assets.stepsData.map((it)=>{
      <Card title={it.title} description={it.description} icon={it.icon}/>
            
      })}

    </div>
  )
}

export default Steps
