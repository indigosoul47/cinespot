import React from 'react';
import news from '../../../news';
import NewsCard from './NewsCard';

function NewsSection() {
  return (
    <div className='row px-16 my-16 flex justify-between'>
        {news.map(news_item => (
            <NewsCard key={news_item._id} news={news_item}/>
        ))}
    </div>
  )
}

export default NewsSection