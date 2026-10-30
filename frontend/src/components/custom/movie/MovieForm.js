import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from '../../../animations/Loading/Loader';
import Loading from '../../main/Loading';
import { useDispatch } from 'react-redux';
import { MOVIE_CREATE_FAIL } from '../../../store/constants/movieConstants';

const MovieForm = ({ onSubmitComplete, submit, movie = {}, loading }) => {

  const dispatch = useDispatch();

  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
 
  const [uploading, setUploading] = useState(false);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!isEmpty()) {
      submit({
        rating,
        comment
      });
    } else {
      dispatch({
        type: MOVIE_CREATE_FAIL,
        payload: 'Please provide all necessary information.'
      });
    }

    if (onSubmitComplete) {
      onSubmitComplete()
    }
  }

  const isEmpty = () => {
    return movie ? false : 
      (rating && rating.trim() === '');
  }

  useEffect(() => {
    if(movie && JSON.stringify(movie) !== '{}'){
      // TODO: set rating and comment
    }else{

    }
  }, [movie]);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }

      const { data } = await axios.post('/api/upload', formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  }

  return loading ? <Loader /> : (
    <form onSubmit={(e) => { handleFormSubmit(e) }} className="mt-4 w-full mb-10">
      {/* { error && <h1 className='text-lg text-orange-500'>{error}</h1> } */}
      <div className='flex p-4 relative justify-center rounded-lg my-10' style={{
        background: '#E5E5E5'
      }}>
        <span className='absolute pointer-events-none top-0'>
          {
            uploading ? <Loading /> : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16 text-slate-500">
                <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
              </svg>
            )
          }
        </span>
        <input type='file' alt="Image Upload" onChange={handleUpload} className='w-full opacity-0' style={{
          background: 'none'
        }} />
      </div>
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

export default MovieForm;