import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'motion/react';
const Card = ({image, description}) => {
    const words = description.split(" ");
  
  // Trim to 10 words and add "..." if needed
  const trimmedText = words.length > 40 ? words.slice(0, 40).join(" ") + "..." : description;
  return (
    

<motion.div
initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 0.5 }}
      whileInView={{ opacity: 0.6, y: 0 }}
      viewport={{ once: true }}
 className="max-w-sm  border border-gray-200 rounded-lg   dark:border-gray-100 m-5 hover:scale-110 transition-all duration-400 bg-gray-500 shadow-2xl shadow-gray-900">
    <a href="#">
        <img className="rounded-t-lg" src={image} alt="" />
    </a>
    <div className="p-5">
        <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-800 dark:text-white">Prompt</h5>
        </a>
        <p className="mb-3 font-normal text-gray-200 dark:text-gray-400">{trimmedText}</p>
        
    </div>
</motion.div>

  )
}

export default Card
