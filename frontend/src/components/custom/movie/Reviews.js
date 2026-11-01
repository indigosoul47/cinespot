import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { addLibrary } from '../../../store/actions/libraryActions';
import './Reviews.css'

function Reviews({reviews = []}) {
    const dispatch = useDispatch();

    const { userInfo } = useSelector(state => state.user);

    console.log('Reviewed', userInfo);

  return (<>
    {
        reviews.map(review =>
            <div key={review._id} className='review flex w-full gap-y-8 my-4 px-16 justify-between items-center'>
                <div className='review-info'>
                    <div>{ review.user?.name }</div>
                    <div>{ review.comment }</div>
                    <div>{ review.rating }</div>
                </div>
                {
                    (userInfo && review.user._id === userInfo._id) && (
                        <div className='review-actions'>
                            <button className='review-delete'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-red-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                            </button>
                            <button className='review-edit'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><title>edit-outline</title><path fill="currentColor" d="M5 19h1.425L16.2 9.225L14.775 7.8L5 17.575zm-2 2v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15t.775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM19 6.4L17.6 5zm-3.525 2.125l-.7-.725L16.2 9.225z"/></svg>
                            </button>
                        </div>
                    )
                }
            </div>
        )
    }
  </>)
}

export default Reviews