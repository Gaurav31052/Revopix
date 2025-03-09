import React from 'react'
import { assets } from '../assets/assets'
const Card = ({image,}) => {
  return (
    

<div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 m-5">
    <a href="#">
        <img className="rounded-t-lg" src={assets.Example4} alt="" />
    </a>
    <div className="p-5">
        <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-800 dark:text-white">Prompt</h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">"You are a young Asian lady on an LSD trip within your DNA, unveiling all the individuals contributed to your existence. You are to observe aspects of their lives in high definition. Trippy, surreal, and executed in a manner only AI can achieve."</p>
        
    </div>
</div>

  )
}

export default Card
