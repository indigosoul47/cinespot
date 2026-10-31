import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { addLibrary } from '../../../store/actions/libraryActions';
import plus_icon from '../../../assets/svg/plus.svg';

function MovieItem({movie}) {
    const dispatch = useDispatch();


  return (
    <div className='flex flex-col w-fit gap-y-8 my-4 items-center' style={{
        width: 'calc(33.33% - 16px)'
    }}>
        <span className='movie-image w-fit rounded overflow-hidden flex items-center cursor-pointer' style={{
            maxHeight: '10rem'
        }}>
            <img src={`${movie.images[0]}`} alt='movie_image' width="300" height="90" className="h-fit"></img>
        </span>
        <span className='movie-action'>
            {
                !movie.added && (
                    <button className='text-green-500' onClick={() => { 
                        dispatch(addLibrary({
                            movie: movie._id
                        }));
                    }}>
                        <img src={plus_icon} alt="plus icon" width="36" />
                    </button>
                )
            }
        </span>
        <span className='movie-details flex flex-col w-11/12'>
            <Link to={`/movie/${movie._id}`}>
                <span className='movie-name text-xl cursor-pointer' style={{
                    fontFamily: 'Jacksilver, Arial, serif',
                }}>{
                    movie.name
                }</span>
            </Link>
            <span className='movie-desc flex justify-between text-slate-500'>
                <div className='main text-sm' style={{
                    fontFamily: 'JosefinSans, Arial, serif',
                }}>
                    casted by {movie.cast}
                </div>
            </span>
        </span>
        <span className='movie-bg -mt-8'>
            {/* <img src={card_bd} alt='movie_style' width="300" height="90" className=""></img> */}
        </span>
    </div>
  )
}

export default MovieItem