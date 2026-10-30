import React from 'react'
import Chip from '../main/Chip'
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function SuggestionBlock() {
    const dispatch = useDispatch();

    const movieStore = useSelector(state => state.movies);

    const { related } = movieStore ? movieStore : {};
  
    useEffect(()=>{
        // Fetch Related
    }, [])

    return (
        <div> 
            {related?.map(movie => (
                <Link to={`/movies/${movie._id}`}>
                    <div className='row flex flex-wrap justify-center'>
                        <div className='col' key={movie._id}>
                            <Chip suggestion={movie.name}/>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default SuggestionBlock