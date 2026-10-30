import React from 'react';

function Chip({suggestion}) {
    // before element for bg
  return (
    <div className='flex flex-col relative items-center justify-center h-64 w-56 m-4 cursor-pointer border-solid border-2 border-sky-500 rounded-lg'>
        <span className='chip-icon mb-4 flex items-center' style={{
          minHeight: '2.8rem'
        }}>
          <img src={`./svg/${suggestion.images ? suggestion.images[0] : ''}`} alt='logo' width="60" height="60"></img>
        </span>
        <span className='chip-heading text-sky-500' style={{
            fontFamily: 'Bunderan, Arial, serif',
        }}>{
          suggestion.name
        }</span>
    </div>
  )
}

export default Chip