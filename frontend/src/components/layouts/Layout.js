import React from 'react';
import Backdrop from '../main/Backdrop';
import Footer from './Footer';
import Header from './Header';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/actions/userActions';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Layout({children, isMain = true}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = Boolean(localStorage.getItem('LOGOUT'));

    if(logoutUser){
      localStorage.removeItem('LOGOUT');
      dispatch(logout());
      navigate('/login');
    }
  });

  return (
    <div className='overflow-hidden flex flex-col relative'>
        <Header/>
        <Backdrop isMain={isMain}/>
        <div className='content'>
            {children}
        </div>
        <Footer/>
    </div>
  )
}

export default Layout