import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const GenerateBtn = () => {

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
    <div className='flex flex-col justify-center items-center pb-16 text-center'>
      <h1 className='text-2xl md:text-3xl lg:4xl mt-4 text-neutral-800 py-6 md:py-16 font-semibold'>See the magic. Try now</h1>
      <div className='flex flex-wrap justify-center gap-4'>
        <button onClick={() => onClickHandler('/result')} className='inline-flex items-center sm:text-lg text-white bg-black w-auto px-12 py-3 gap-2 rounded-full hover:scale-105 transition-all duration-300'>Generate Images
          <img className='h-6' src={assets.star_group} alt=''/>
        </button>
        <button onClick={() => onClickHandler('/remove-background')} className='inline-flex items-center sm:text-lg text-white bg-black w-auto px-12 py-3 rounded-full hover:scale-105 transition-all duration-300'>Remove Background</button>
      </div>
    </div>
  )
}

export default GenerateBtn
