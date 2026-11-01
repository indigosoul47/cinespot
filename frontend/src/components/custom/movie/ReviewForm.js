import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from '../../../animations/Loading/Loader';
import Loading from '../../main/Loading';
import { useDispatch } from 'react-redux';
import { MOVIE_CREATE_FAIL } from '../../../store/constants/movieConstants';
import { updateLibrary } from '../../../store/actions/libraryActions';

const ReviewForm = ({ onSubmitComplete, movie = {}, loading }) => {

  const dispatch = useDispatch();

  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
 
  const [uploading, setUploading] = useState(false);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    console.log('Submited', isEmpty())
    if (!isEmpty()) {
      dispatch(updateLibrary(movie._id, {
        rating,
        comment
      }));
    } else {
      dispatch({
        type: MOVIE_CREATE_FAIL,
        payload: 'Please provide all necessary information.'
      });
    }

    // if (onSubmitComplete) {
    //   onSubmitComplete()
    // }
  }

  const isEmpty = () => {
    return movie ? false : 
      (rating && rating.trim() !== '');
  }

  useEffect(() => {
    if(movie && JSON.stringify(movie) !== '{}'){
      // TODO: set rating and comment
    }else{

    }
  }, [movie]);

  return loading ? <Loader /> : (
    <form onSubmit={(e) => { handleFormSubmit(e) }} className="mt-4 w-full mb-10">
      {/* { error && <h1 className='text-lg text-orange-500'>{error}</h1> } */}
      <div className='flex p-4 rounded-lg my-10' style={{
        background: '#E5E5E5'
      }}>
        <input type='number' placeholder='Rating' defaultValue={+rating} onChange={(e) => setRating(e.target.value)} className='w-full' style={{
          background: 'none'
        }} />
      </div>
      <div className='flex p-4 rounded-lg my-10' style={{
        background: '#E5E5E5'
      }}>
        <input type='text' placeholder='Comment' defaultValue={comment} onChange={(e) => setComment(e.target.value)} className='w-full' style={{
          background: 'none'
        }} />
      </div>
      <div className='form-action mt-16 item-center flex justify-center'>
        <button className='btn cursor-pointer flex' type='submit'>
          <span className='btn-icon mr-4'>
            <svg xmlns="http://www.w3.org/2000/svg" fill='none' viewBox="0 0 24 24" strokeWidth="1.5" stroke="#E60033" className="w-12 h-12">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
            </svg>
          </span>
          <span className='btn-text text-center text-3xl flex relative text-white' style={{
            fontFamily: 'Jacksilver, Arial, serif',
          }}>
            Done
            {/* <span className='btn-bd absolute -bottom-4 -z-10'>
              <img src={btn_streak} alt='logo' width="150" height="30" className="-mt-4"></img>
            </span> */}
          </span>
        </button>
      </div>
    </form>
  )
}

export default ReviewForm;