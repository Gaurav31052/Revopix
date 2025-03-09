import React, { useState } from 'react'
import {assets} from '../assets/assets'
import { Link } from 'react-router-dom'
const Navbar = () => {

const [user, setUser] = useState(null);

  return (
    <div className='flex justify-between items-center py-4 '>
      <Link to='/'><img src={assets.logo} alt='' className='w-28 sm:w-32 lg:w-40'/></Link>

      <div >
      {user?
        <div></div>
        :
        <div className='flex justify-between items-center gap-2 sm:gap-5'>
          <p className=' cursor-pointer'>Pricing</p>
          <button className=' bg-zinc-800 text'>Login</button>
        </div>
      }
      </div>
    </div>
  )
}

export default Navbar
