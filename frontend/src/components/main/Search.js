import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

function Search({main = true, placeholder = 'Search'}) {
  const navigate = useNavigate();
  const { search } = useLocation();

  const [ keyword, setKeyword ] = useState('');
  const [ category ] = useState('');
  const [ tags, setTags ] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    var url = window.location.pathname;
    if(keyword.trim() !== ''){
      url = url + `?keyword=${keyword}`;
    }
    if(category.trim() !== ''){
      url = url + `&category=${category}`
    }
    if(tags.trim() !== ''){
      url = url + `&tags=${tags}`
    }
    navigate(url);
  }

  useEffect(() => {
    const keywordQuery = search ? search.split('?')[1].split('&').filter(q => q.startsWith('keyword'))[0]: null;
    
    const keywordStr = keywordQuery ? keywordQuery.split('=')[1] : '';
    
    const tagQuery = search ? search.split('?')[1].split('&').filter(q => q.startsWith('tags'))[0]: null;
    
    const tagStr = tagQuery ? tagQuery.split('=')[1] : '';

    setKeyword(keywordStr);
    setTags(tagStr);
  }, [search])

  return (
    <div className='flex p-4 rounded-lg mx-40' style={ !main ? {
      margin: '0 1rem 0 0',
      width: '75vw',
      background: '#E5E5E5'
    } : {
      background: '#E5E5E5'
    }}>
      <input 
        type='text' 
        placeholder={placeholder} 
        className='w-full' 
        style={{
          background: 'none'
        }}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <div onClick={submitHandler}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      </div>
    </div>
  )
}

export default Search