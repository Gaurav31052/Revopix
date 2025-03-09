import React from 'react'
import Card from './Card'

const Example = () => {
  return (
    <><h2 className='flex justify-center items-centerm'>Demo</h2>
    <div className="grid grid-cols-3 gap-4">
      <Card/>
      <Card/>
      <Card/>
      <Card/>
      <Card/>
    </div>
    </>
  )
}

export default Example
