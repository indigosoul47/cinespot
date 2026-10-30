import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/layouts/Layout';
import Loading from '../../components/main/Loading';
import { Tab, Popover, Dialog } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, updateUser } from '../../store/actions/userActions';
import Search from '../../components/main/Search';
import { createMovie, deleteMovie, fetchMovie, fetchMovies, updateMovie } from '../../store/actions/movieActions';
import { MOVIE_RESET_REQUEST } from '../../store/constants/movieConstants';
import { usePopper } from 'react-popper';
import Tooltip from '../../components/main/Tooltip';

const Dashboard = () => {
    const dispatch = useDispatch();

    const { users, loading: usersLoading } = useSelector(state => state.admin.user);
    const { movies, movie, loading: moviesLoading } = useSelector(state => state.movies);
    
    let [referenceElement, setReferenceElement] = useState()
    let [popperElement, setPopperElement] = useState()
    let { styles, attributes } = usePopper(referenceElement, popperElement)

    useEffect(() => {
      dispatch(fetchUsers());
      dispatch(fetchMovies('', '', '0'));
    }, [dispatch]);

    const loading = false;

    const deleteUser = (id) => {
      dispatch(deleteUser(id));
    } 

    const removeMovie = (id) => {
      dispatch(deleteMovie(id));
    }
    
    return (
      <Layout isMain={false}>
        <div className='mx-16 flex items-center flex-col'>
          <Tab.Group>
            <Tab.List className='rounded-2xl overflow-hidden bg-gray-200 my-8' style={{
              fontFamily: 'Rink, Arial, serif',
            }}>
              <Tab as={Fragment}>
                {({ selected }) => (
                  <button className={`${selected ? 'bg-sky-500 text-white' : 'bg-transparent text-black'} py-2 px-4 mr-2 rounded-sm text-xl`}>
                    Overview
                  </button>
                )}
              </Tab>
              <Tab as={Fragment}>
                {({ selected }) => (
                  <button className={`${selected ? 'bg-sky-500 text-white' : 'bg-transparent text-black'} py-2 px-4 mx-2 rounded-sm text-xl`}>
                    Users
                  </button>
                )}
              </Tab>
              <Tab as={Fragment}>
                {({ selected }) => (
                  <button className={`${selected ? 'bg-sky-500 text-white' : 'bg-transparent text-black'} py-2 px-4 mx-2 rounded-sm text-xl`}>
                    Movies
                  </button>
                )}
              </Tab>
            </Tab.List>
            {
              loading ? <Loading /> : (
                <Tab.Panels>
                    <Tab.Panel>
                      <div className='flex h-full'>
                        <h1 className='text-4xl text-slate-400 my-40' style={{
                          fontFamily: 'Shockwave, Arial, serif'
                        }}>Coming Soon</h1>
                      </div>
                    </Tab.Panel>
                    <Tab.Panel>
                      <div className='flex h-full w-screen flex-col my-20 px-32'  style={{
                        fontFamily: 'Kregan, Arial, serif'
                      }}>
                        <span className='mb-4'><Search main={false} placeholder="Search Users" /></span>
                        {
                          usersLoading ? <Loading /> : (
                            users && users.length > 0 ?
                              users.map((user, idx) => (
                                <div className='w-full flex justify-between items-center my-4 ' key={idx}>
                                  {/* <img src={bull_logo} alt='user_img' className='h-12 w-12 rounded'/> */}
                                  <span>
                                    <Tooltip content={<>
                                      <span className='text-purple-100'>{ user.email }</span>
                                    </>}>
                                      { user.name }
                                    </Tooltip>
                                  </span>
                                  <span>{ user.price }</span>
                                  <span className="cursor-pointer">
                                    <Tooltip className='w-full' message={`${ user.isAdmin ? 'Revoke' : 'Grant' } Admin Privilages`}>
                                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-6 h-6 ${ user.isAdmin ? 'text-green-500' : 'text-slate-500'}`} onClick={() => {
                                        dispatch(updateUser({
                                          id: user._id,
                                          isAdmin: !user?.isAdmin
                                        }));
                                        setTimeout(() => {
                                          dispatch(fetchUsers());
                                        }, 500);
                                      }}>
                                        <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 00.374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 00-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08zm3.094 8.016a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                                      </svg>  
                                    </Tooltip>
                                  </span>   
                                  <div className='user-actions mt-8 flex'>
                                    <span className='mx-4'>
                                      <button onClick={() => { deleteUser(user._id) }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-red-500">
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                      </button>
                                    </span>
                                  </div>
                                </div>
                              )) : (
                                <span className='flex items-center justify-center w-full flex-col my-8'>
                                  {/* <img src={bull_logo} alt="logo" className='h-16 w-16 mb-4'/> */}
                                  <h1 className='text-2xl text-slate-400' style={{
                                      fontFamily: 'Shockwave, Arial, serif'
                                  }}>Users Not Found</h1>
                                </span>
                              )
                          )
                        }
                      </div>
                    </Tab.Panel>
                    <Tab.Panel>
                      <div className='flex h-full w-screen flex-col my-20 px-32'  style={{
                        fontFamily: 'Kregan, Arial, serif'
                      }}>
                        <span className='mb-4'><Search main={false} placeholder="Search Movie" /></span>
                        {
                          moviesLoading ? <Loading /> : (
                            movies && movies.length > 0 ?
                              movies.map((movie, idx) => (
                                <div className='w-full flex justify-between items-center my-8' key={idx}>
                                  <img src={`${movie.images[0]}`} alt='user_img' className='h-12 w-12 rounded'/>
                                  <span><Link to={`/movie/${movie._id}`}>{ movie.name }</Link></span>
                                  <div className='movie-actions flex'>
                                    <span className='mx-4'>
                                      <Tooltip content={
                                        <div className='flex flex-col w-max'>
                                          <span className='flex'>{`Genre: ${ movie.genre }`}</span>
                                          <span className='flex'>Tags: { (movie.tags && movie.tags.filter(tag => tag.trim() !== '').length > 0) ? movie.tags.map((tag, idx) => {
                                            return <span className='mx-2' key={idx}>#{tag.replace('#', '')}</span>
                                          }) : 'N/A' }</span>
                                        </div>
                                      }>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#7007d6" className="w-6 h-6">
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                                        </svg>
                                      </Tooltip>
                                    </span>
                                    <span className='mx-4'>
                                      <Popover className="relative">
                                        <Popover.Button onClick={() => {  }} ref={setReferenceElement}>
                                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-red-500">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                          </svg>
                                        </Popover.Button>

                                        <Popover.Panel
                                          className="absolute z-10 p-8 rounded bg-slate-700 text-white"
                                          ref={setPopperElement}
                                          style={styles.popper}
                                          {...attributes.popper}>
                                            {({ close }) => (
                                              <div className='flex flex-col' style={{
                                                'minWidth': '12rem'
                                              }}>
                                                <h1>Are you sure you want to continue?</h1>
                                                <div className='flex justify-evenly mt-8'>
                                                  <button className='text-green-500' onClick={() => { 
                                                    removeMovie(movie._id);
                                                  }}>
                                                    Yes
                                                  </button>
                                                  <button className='text-orange-500' onClick={() => { 
                                                    close();
                                                  }}>
                                                    No
                                                  </button>
                                                </div>
                                              </div>
                                            )}
                                        </Popover.Panel>
                                      </Popover>
                                    </span>
                                  </div>
                                </div>
                              )) : (
                                <span className='flex items-center justify-center w-full flex-col my-8'>
                                  {/* <img src={bull_logo} alt="logo" className='h-16 w-16 mb-16'/> */}
                                  <h1 className='text-4xl text-slate-400' style={{
                                      fontFamily: 'Shockwave, Arial, serif'
                                  }}>Movies Not Found</h1>
                                </span>
                              )
                          )
                        }
                      </div>
                    </Tab.Panel>
                  </Tab.Panels>
              )
            }
          </Tab.Group>
        </div>
      </Layout>
    )
}

export default Dashboard