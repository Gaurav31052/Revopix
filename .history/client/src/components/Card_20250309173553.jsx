import React from 'react'
import { assets } from '../assets/assets'
const Card = ({image, description}) => {
    const words = description.split(" ");
  
  // Trim to 10 words and add "..." if needed
  const trimmedText = words.length > 40 ? words.slice(0, 40).join(" ") + "..." : description;
  return (
    

<motion.div

 className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 m-5">
    <a href="#">
        <img className="rounded-t-lg" src={image} alt="" />
    </a>
    <div className="p-5">
        <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-800 dark:text-white">Prompt</h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{trimmedText}</p>
        
    </div>
</motion.div>

  )
}

export default Card
