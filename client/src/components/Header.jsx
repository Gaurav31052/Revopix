import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { motion } from "motion/react"
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const {user, setShowLogin} = useContext(AppContext);
  const navigate = useNavigate();

  const onClickHandler = (path) => {
    if(user) {
      navigate(path)
    }
    else {
      setShowLogin(true)
    }
  }
  return (
    <motion.div className='flex flex-col justify-center items-center text-center my-20'
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <motion.div className='text-stone-500 inline-flex text-center gap-2 bg-white px-6 py-1 rounded-full order-neutral-500'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <p>Turn Prompts into Masterpieces</p>
        <img src={assets.star_icon} alt='' />
      </motion.div>

      <motion.h1 className='text-6xl max-w-[300px] sm:text-8xl sm:max-w-[790px] mx-auto mt-10 text-center font'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 2 }}
      >Turn text to <span className='text-gray-700 font'

      >image</span>, in seconds</motion.h1>

      <motion.p className='text-center max-w-xl mx-auto mt-5'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >Unleash your creativity with AI. Turn your imagination into visual art in seconds - just type , and watch the magic happen.</motion.p>

      <motion.div
        className='flex flex-wrap justify-center gap-4 mt-8'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ default: { duration: 0.8 }, opacity: { delay: 0.8, duration: 1 } }}
      >
        <button onClick={() => onClickHandler('/result')} className='sm:text-lg text-white bg-black w-auto px-12 py-2.5 flex items-center gap-2 rounded-full hover:scale-105 transition-all duration-300'>
          Generate Images
          <img className='h-6' src={assets.star_group} alt='' />
        </button>
        <button onClick={() => onClickHandler('/remove-background')} className='sm:text-lg text-white bg-black w-auto px-12 py-2.5 rounded-full hover:scale-105 transition-all duration-300'>
          Remove Background
        </button>
      </motion.div>



      <motion.div className='flex flex-wrap justify-center mt-16 gap-3'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}>
        {Array(6).fill('').map((item, index) => (
          <motion.img
            whileHover={{ scale: 1.05, duration: 0.1 }} className='rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10' src={index % 2 === 0 ? assets.sample_img_1 : assets.sample_img_2} alt='' key={index} width={70} />
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className='mt-2 text-neutral-600'>Generated Images from RevoPix</motion.p>



    </motion.div>
  )
}

export default Header
