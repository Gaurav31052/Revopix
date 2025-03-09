import React from 'react'
import Card from './Card'

const Example = () => {
  return (
    <><h2 className='flex justify-center items-center mb-3 text-5xl font-bold'>Demo</h2>
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
