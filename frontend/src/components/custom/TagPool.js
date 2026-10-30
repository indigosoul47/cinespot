import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTags } from '../../store/actions/movieActions';

function TagPool() {
  const dispatch = useDispatch();
  
  const movieStore = useSelector(state => state.movies);

  const { tags } = movieStore;

  useEffect(()=>{
    dispatch(fetchTags());
  }, [])

  console.log('TAGS', tags);

  return (
    <div className='px-32 py-16'>
      <div className='row flex flex-wrap'>
          {tags?.map(tag => (
            <Link to={`/store?tags=${tag}`}>
              <span className='tag flex justify-center flex-col w-fit m-auto basis-1/3 cursor-pointer items-center' key={tag}>
                <span className='heading-text text-center text-2xl mb-4' style={{
                    fontFamily: 'Bunderan, Arial, serif',
                    color: 'black',
                }}>
                  # {tag}
                </span>
                {/* <img src={heading_bd} alt='logo' width="300" height="30" className="-z-10 opacity-60 px-4" style={{
                    marginTop: '-1rem'
                }}></img> */}
              </span>
            </Link>
          ))}
      </div>
      <div className='icon-btn w-fit ml-auto mt-4 cursor-pointer' style={{
        color: '#e60033',
      }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
  )
}

export default TagPool