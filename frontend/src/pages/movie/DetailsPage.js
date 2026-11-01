import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Heading from '../../components/main/Heading';
import Layout from '../../components/layouts/Layout';
import { fetchMovie, fetchRelated } from '../../store/actions/movieActions';
import Related from '../../components/custom/Related';
import Loading from '../../components/main/Loading';
import ReviewForm from '../../components/custom/movie/ReviewForm';
import Reviews from '../../components/custom/movie/Reviews';

function DetailsPage() {
  const dispatch = useDispatch();

  const movieStore = useSelector(state => state.movies);
  const { loading: loadingMovie, movie, error, loadingRelated, related } = movieStore;


  const { pathname } = useLocation();

  useEffect(() => {
    const params = pathname.split('/').filter(el => el.trim() !== '');

    dispatch(fetchRelated(''));
    dispatch(fetchMovie(params[params.length -1]));
  }, [dispatch, pathname]);


  return (
    <Layout isMain={false}>
      {
        loadingMovie ? <Loading/> : (movie && (
          <div className='flex flex-col mx-16'>
            <div className='main flex justify-around'>
              <span className='movie-image w-fit rounded overflow-hidden'>
                {movie.images && <img src={`${movie.images[0]}`} alt='movie_image' width="350" height="90" className=""></img>}
              </span>
              <span className='movie-details flex flex-col'>
                  <span className='movie-name text-4xl' style={{
                      fontFamily: 'Jacksilver, Arial, serif',
                  }}>{
                      movie.name
                  }</span>
                    <span className='movie-user flex flex-col justify-between h-full'>
                      <div className='main text-lg text-slate-500 mt-4' style={{
                          fontFamily: 'JosefinSans, Arial, serif',
                      }}>
                          Casting by {movie.cast ? movie.cast : ''}
                      </div>
                      <span className='movie-genre mt-8 text-end text-4xl text-orange-400' style={{
                        fontFamily: 'Shockwave, Arial, serif',
                      }}>{
                        movie.genre
                      }</span>
                      <span className='movie-bg'>
                        {/* <img src={card_bd} alt='movie_style' width="350" height="90" className=""></img> */}
                      </span>
                      <div className='movie-action mt-auto item-center flex justify-end mt-8'>
                        <span className='btn cursor-pointer flex' onClick={() => { }}>
                          <span className='btn-icon'>
                              
                          </span>
                          <span className='btn-text text-center text-3xl flex relative' style={{
                              fontFamily: 'Jacksilver, Arial, serif',
                          }}>
                            Add to Favorites
                            <span className='btn-bd absolute -bottom-4 -z-10'>
                              {/* <img src={btn_streak} alt='logo' width="150" height="30" className="-mt-4"></img> */}
                            </span>
                          </span>
                        </span>
                      </div>          
                    </span>
              </span>
            </div>
            <div className='secondary mt-20'>
              <div className='movie-desc flex flex-col'>
                <span className='description-heading text-xl mb-4' style={{
                  fontFamily: 'Shockwave, Arial, serif',
                  color: '#E8983F'
                }}>
                  Description
                </span>
                <span className='description-notes font-light text-lg text-slate-500' style={{
                  fontFamily: 'JosefinSans, Arial, serif',
                }}>
                  {movie.plot}
                </span>
              </div>
            </div>
          </div>
        ))
      }
      <ReviewForm movie={movie}/>  
      <Reviews reviews={movie?.reviews}/>
      <Heading alt>
        Suggested
      </Heading>
      <Related error={error} movies={related} loading={loadingRelated}/>
    </Layout>
  )
}

export default DetailsPage