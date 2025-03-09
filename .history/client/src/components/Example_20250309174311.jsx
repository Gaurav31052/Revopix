import React from 'react'
import Card from './Card'
import { example } from '../assets/assets'

const Example = () => {
  return (
    <><h2 className='flex justify-center items-center mb-3 text-5xl font-bold font'>Demo</h2>
    <div className="grid sm:grid-cols-3 sm:grid-cols-3 gap-4">
    {example.map((item,index)=>(
        <Card key={index} image={item.image} description={item.description}/>
    ))}
      
    </div>
    </>
  )
}

export default Example
