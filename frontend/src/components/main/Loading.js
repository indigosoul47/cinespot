import React from 'react'
import Loader from '../../animations/Loading/Loader'

const Loading = () => {
  return (
    <div className='flex items-center my-32 flex-col'>
        <Loader/>
        <span className='text-gray-500 text-xl' style={{
            fontFamily: 'Shockwave, Arial, serif'
        }}>
            Loading
        </span>
    </div>
  )
}

export default Loading