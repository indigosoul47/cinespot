import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { addLibrary } from '../../../store/actions/libraryActions';

function Rating({movie}) {
    const dispatch = useDispatch();


  return (
    <div className='flex flex-col w-fit gap-y-8 my-4 items-center' style={{
        width: 'calc(33.33% - 16px)'
    }}>
        
    </div>
  )
}

export default Rating