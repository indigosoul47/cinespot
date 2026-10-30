import React from 'react';
import news_tag from '../../../assets/svg/news-tag.svg';

function NewsCard({news}) {
  // use before and after background for effects

  return (
    <div className={`relative ${(news.minimal === 'false') ? 'w-4/6' : 'w-2/6'} cursor-pointer mx-4`}>
      <div className={`h-48 rounded-xl flex ${(news.minimal === 'false') ? 'flex-col' : 'flex-col-reverse'} justify-end p-8 relative overflow-hidden mx-4`} style={{
        // background: `linear-gradient(180deg, rgba(2, 0, 36, 0) 40%, ${(news.minimal === 'false') ? 'rgb(233 153 63)': 'rgb(230 0 51)'} 100%)`
        background: `linear-gradient(45deg,rgb(75 75 75/ 65%) 40%, ${(news.minimal === 'false') ? 'rgb(245 147 36)' : 'rgb(85 177 208)'} 100%)`
      }}>
          <span className='card-bg -z-10'>
            <img src={`./jpg/${news.bg_images[0]}`} alt='logo' width="1080" height="30" className="inset-center"></img>
          </span>
          <span className={`card-heading text-2xl ${(news.minimal === 'false') ? '' : 'm-auto'}`} style={{
            fontFamily: 'Shockwave, Arial, serif',
            color: 'white',
          }}>{
            news.headline
          }</span>
          { 
            (news.minimal === 'false') && (
              <span className='card-description text-xl pr-1 text-gray-800' style={{
                fontFamily: 'JosefinSans, Arial, serif',
              }}>{
                news.description
              }
              </span>
            )
          }
      </div>
      {/* <span className={`streak-1 absolute ${(news.minimal === 'false') ? '-left-8 -bottom-8' : 'left-2 -bottom-2'}`}>
        <img src={(news.minimal === 'false') ? streak_1 : streak_alt_1} alt='logo' width={(news.minimal === 'false') ? '300' : '150'} height="30" className=""></img>
      </span>
       */}
      <span className={`streak-2 absolute ${'-top-8 -right-8'}`}>
        <img src={news_tag} alt='logo' width={150} height="30" className=""></img>
      </span>
    </div>
  )
}

export default NewsCard