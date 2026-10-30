import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MovieItem from './MovieItem';
import arrow_l from '../../../assets/svg/arrow-l.svg';
import arrow_r from '../../../assets/svg/arrow-r.svg';
import page_ind from '../../../assets/svg/page-ind.svg';

function Movies({ pages, page, total, keyword }) {

  const size = 6;
    
  const movieStore = useSelector(state => state.movies);
  const { movies } = movieStore;

  return (
    <div>
        <div className='store flex flex-wrap my-8 mx-16 gap-x-4'>
            {
                movies?.map(movie => <MovieItem key={movie._id} movie={movie}/>)
            }
        </div>
        <div className="pagination flex flex-col mx-32" style={{
            fontFamily: 'Jacksilver, Arial, serif',
        }}>
            <span className='summary text-right'>
                { `Showing ${ (size * ( page - 1 )) + 1 } - ${size * page} of ${total} results` }
            </span>
            <span className='pages flex justify-center gap-x-8 items-start mt-8 text-xl'>
                {
                    (page > 1) && (
                        <span className='cursor-pointer'>
                            <Link to={`${window.location.pathname}?keyword=${keyword}&page=${page - 1}`}>
                                <img src={arrow_l} alt='page_arrow' width="15" height="15" className=""></img>    
                            </Link>                
                        </span>
                    )
                }
                { 
                    [...Array(pages).keys()].map(key => (
                        <span className='flex flex-col justify-center text-center cursor-pointer' key={key}>
                            <Link to={`${window.location.pathname}?keyword=${keyword}&page=${key + 1}`}>{key + 1}</Link>
                            { (key + 1) === page && <img src={page_ind} alt='page_ind' width="25" height="25" className=""></img> }
                        </span>
                    ))
                }
                {
                    (page < pages) && (
                        <span className='cursor-pointer'>
                            <Link to={`${window.location.pathname}?keyword=${keyword}&page=${page + 1}`}>
                                <img src={arrow_r} alt='page_arrow' width="15" height="15" className=""></img>    
                            </Link>                
                        </span>
                    )
                }
            </span>
        </div>
    </div>
  )
}

export default Movies