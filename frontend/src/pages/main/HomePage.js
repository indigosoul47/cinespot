import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import NewsSection from '../../components/custom/news/NewsSection'
import Search from '../../components/main/Search'
import SuggestionBlock from '../../components/custom/SuggestionBlock'
import TagPool from '../../components/custom/TagPool'
import Heading from '../../components/main/Heading'
import Layout from '../../components/layouts/Layout'
import Movies from '../../components/custom/movie/Movies'
import { fetchMovies } from '../../store/actions/movieActions'

const HomePage = () => {
  const dispatch = useDispatch();

  const { search } = useLocation();

  const [ searchWord, setSearchWord ] = useState('');

  const keywordQuery = search ? search.split('?')[1].split('&').filter(q => q.startsWith('keyword'))[0]: null;
      
  const keyword = keywordQuery && keywordQuery.split('=')[1] ? keywordQuery.split('=')[1] : '';

  const pageQuery = search ? search.split('?')[1].split('&').filter(q => q.startsWith('page'))[0]: null;
      
  const page = pageQuery ? pageQuery.split('=')[1] : '1';

  const sizeQuery = search ? search.split('?')[1].split('&').filter(q => q.startsWith('pSize'))[0]: null;
  
  const sizeStr = sizeQuery ? sizeQuery.split('=')[1] : '6';
  
  useEffect(() => {    
      const genQuery = search ? search.split('?')[1].split('&').filter(q => q.startsWith('genre'))[0]: null;
      
      const genStr = genQuery ? genQuery.split('=')[1] : '';


      console.log('Keyword', keyword)
  
      setSearchWord(keyword);
  
      dispatch(fetchMovies(keyword, page, sizeStr, genStr));
    }, [dispatch, search]);

  return (
      <>
        <Layout>
          <Search/>
          {/* <ChoiceWizard/> */}
          {/* <Preview/> */}
          <Movies keyword={keyword} page={Number(page)} total={Number(sizeStr)}/>
          <Heading>
            Recommended
          </Heading>
        </Layout>
      </>
  )
}

export default HomePage