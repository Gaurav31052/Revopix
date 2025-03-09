import React from 'react'
import Card from './Card'
import { example } from '../assets/assets'

const Example = () => {
  return (
    <><h2 className='flex justify-center items-center mb-3 text-5xl font-bold'>Demo</h2>
    <div className="grid grid-cols-3 gap-4">
    {example.map((item,index)=>(
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 m-5">
    <a href="#">
        <img className="rounded-t-lg" src={item.image} alt="" />
    </a>
    <div className="p-5">
        <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-800 dark:text-white">Prompt</h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.description}</p>
        
    </div>
</div>
    ))}
      
    </div>
    </>
  )
}

export default Example
