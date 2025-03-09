import React from 'react'
import { assets } from '../assets/assets'

const Card = ({title, description, icon}) => {
  return (
    <div>
      <div>
        <div><img src={assets.icon} alt=''/> </div>
        <div>
            <p>{assets.title}</p>
        </div>
      </div>
    </div>
  )
}

export default Card
