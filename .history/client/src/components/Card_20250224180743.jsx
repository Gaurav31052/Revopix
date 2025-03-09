import React from 'react'
import { assets } from '../assets/assets'

const Card = ({title, description, icon}) => {
  return (
    <div>
      <div>
        <img src={assets.icon} alt=''/>
        <div>
            <p>{title}</p>
            <p>{description}</p>
        </div>
      </div>
    </div>
  )
}

export default Card
