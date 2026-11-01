import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Search from '../../components/main/Search'
import Heading from '../../components/main/Heading';
import Layout from '../../components/layouts/Layout';
import { searchMovies, fetchRelated } from '../../store/actions/movieActions';
import Loading from '../../components/main/Loading';
import Related from '../../components/custom/Related';
import { useLocation, useNavigate } from 'react-router-dom';
import Movies from '../../components/custom/movie/Movies';

function ListingsPage() {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const navigate = useNavigate();

  const movieStore = useSelector(state => state.movies);
  const { loading, error, movies, page, pages, total, loadingRelated, related } = movieStore;

  const [ searchWord ] = useState('');

  useEffect(() => {    
    const keywordQuery = search ? search.split('?')[1].split('&').filter(q => q.startsWith('keyword'))[0]: null;
    
    const keyword = keywordQuery ? keywordQuery.split('=')[1] : '';

    const pageQuery = search ? search.split('?')[1].split('&').filter(q => q.startsWith('page'))[0]: null;
    
    const page = pageQuery ? pageQuery.split('=')[1] : '';

    const genQuery = search ? search.split('?')[1].split('&').filter(q => q.startsWith('genre'))[0]: null;
    
    const genStr = genQuery ? genQuery.split('=')[1] : '';

    const sizeQuery = search ? search.split('?')[1].split('&').filter(q => q.startsWith('pSize'))[0]: null;
          
    const sizeStr = sizeQuery ? sizeQuery.split('=')[1] : '';

    dispatch(searchMovies(keyword, page, sizeStr, genStr));
    dispatch(fetchRelated(''));
  }, [dispatch, search]);

  useEffect(() => {
    if(search.trim() === ''){
      navigate(`/browse?keyword=`);
    }   
  });

  return <>
    <Layout isMain={false}>
      <Search/>
      {
        loading ? (
          <Loading/>
        ) : error ? (
          <>
            <span className='flex items-center flex-col my-32'>
              <h1 className='text-2xl text-slate-400' style={{
                fontFamily: 'Shockwave, Arial, serif'
              }}>No results found.</h1>
              <p className='text-lg mt-4 text-gray-400' style={{
                fontFamily: 'JosefinSans, Arial, serif'
              }}>Give it another go in a moment</p>              
            </span>
          </>
        ) : (
          movies && <Movies page={page} pages={pages} total={total} keyword={searchWord}/>
        )
      }
      <Heading alt>
        Suggested
      </Heading>
      <Related loading={loadingRelated} movies={related} error={error}/>
    </Layout>
  </>
}

export default ListingsPage