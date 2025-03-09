import React from 'react'
import { assets } from '../assets/assets'

const Card = ({title, description, icon}) => {
  return (
    <div>
      <div>
        <div><img src={icon} alt=''/> </div>
        <div>
            <p>{title}</p>
            <p>{description}</p>
        </div>
      </div>
    </div>
  )
}

export default Card
