import React from 'react'
import Card from './Card'
import { assets } from '../assets/assets'

const Steps = () => {
  return (
    <div>
      <div>
        <h1>How it works</h1>
        <p>Transform Words Into Stunning Images</p>
      </div>

      {assets.stepsData.map((it)=>{
      <Card title={it.title} description={it.description} icon={it.icon}/>
            
      })}

    </div>
  )
}

export default Steps
