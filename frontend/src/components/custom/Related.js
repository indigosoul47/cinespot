import React from 'react';
import { useSelector } from 'react-redux';
import MovieItem from './movie/MovieItem';
import Loading from '../main/Loading';


const Related = ({loading, movies, error}) => {
  
  return (
    loading ? (
        <Loading/>
      ) : error ? (
        <>
            <span className='flex items-center flex-col my-32'>
            <h1 className='text-2xl text-slate-400' style={{
                fontFamily: 'Shockwave, Arial, serif'
            }}>No suggestions found.</h1>
            <p className='text-lg mt-4 text-gray-400' style={{
                fontFamily: 'JosefinSans, Arial, serif'
            }}>Give it another go in a moment</p>
            </span>
        </>
    ) : (
        movies &&
        <div className='flex flex-wrap gap-x-4 mx-16 my-40'>
            {
                JSON.parse(JSON.stringify(movies)).map(movie => <MovieItem key={movie._id} movie={movie}/>)
            }
        </div>
    )
  )
}

export default Related