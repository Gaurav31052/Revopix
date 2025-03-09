import React from 'react'
import { assets } from '../assets/assets'

const Card = ({title, description, icon}) => {
  return (
    <div>
      <div>
        <img src={assets.icon} alt=''/>
        <div>
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
      </div>
    </div>
  )
}

export default Card
