import React, { useContext } from 'react'
import {assets} from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
const Navbar = () => {


const navigate = useNavigate();

  const {user, setShowLogin, logout, credit} = useContext(AppContext)

  return (
    <div className='flex justify-between items-center py-4 '>
      <Link to='/'><img src={assets.logo1} alt='' className='w-28 sm:w-40 lg:w-60'/></Link>

      <div >
      {user?
        <div className='flex items-center gap-2 sm:gap-5'>
          <button onClick={()=>navigate('/buy')} className='flex items-center justify-center gap-1 bg-blue-100 px-4 sm:px-6 rounded-full  py-1.2 sm:py-3 hover:scale-105 transition-all duration-700'>
            <img src={assets.credit_star} alt='' className='w-5'/><p className=' text-sm sm:text-sm font-medium text-gray-600 '>Credit left : {credit}</p>
          </button>

          <p className=' text-gray-600 max-sm:hidden pl-4'>Hi, {user.name}</p>
          <div className='relative group'>
            {/* <img src={assets.profile_icon} alt='' className='w-10 drop-shadow'/> */}
            <div className=' w-12 h-12 border-white from-gray-500 to-gray-00 rounded-full flex justify-center items-center font-extrabold text-4xl text-gray-800  '>{user.name.charAt(0).toUpperCase()}</div>
            <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12 '>
              <ul className='list-none m-0 p-2 rounded-md bg-white border text-sm '>
                <li onClick={logout} className='py-1 px-2 cursor-pointer pr-10 '>Logout</li>
              </ul>
            </div>
          </div>
        </div>
        :
        <div className='flex justify-between items-center gap-2 sm:gap-5'>
          <p onClick={()=>navigate('/buy')} className=' cursor-pointer'>Pricing</p>
          <button onClick={()=>setShowLogin(true)} className=' cursor-pointer bg-zinc-800 text-white px-7 py-2 sm:px-10 text-sm rounded-full'>Login</button>
        </div>
      }
      </div>
    </div>
  )
}

export default Navbar
