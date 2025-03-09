import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom';

const GenerateBtn = () => {

  const {user, setShowLogin} = useContext(AppContext);
  const navigate = useNavigate();

  const onClickHandler = () => {
    if(user) {
      navigate('/result')
    }
    else {
      setShowLogin(true)
    }

  }

  return (
    <div className='flex flex-col justify-center items-center pb-16 text-center'>
      <h1 className='text-2xl md:text-3xl lg:4xl mt-4 text-neutral-800 py-6 md:py-16 font-semibold'>See the magic. Try now</h1>
      <button className='inline-flex items-center  sm:text-lg text-white bg-black w-auto px-12 py-3 gap-2 rounded-full m-auto hover:scale-105 transition-all duration-300 '>Generate Images
            <img className=' h-6' src={assets.star_group} alt=''/></button>
    </div>
  )
}

export default GenerateBtn
