import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '../../assets/png/logo.png';
import UserOptions from '../custom/user/UserOptions';

const Header = () => {
  const { userInfo } = useSelector(state => state.user);

  return <header>
    <div className='header-bd flex w-screen absolute' style={{
      zIndex: '-1'
    }}>
      <img src={logo} alt='logo' width="450" height="30" className="d-inline-block align-top opacity-20 ml-auto mr-16 -mt-16"></img>
    </div>
    <div className='navbar p-16 flex justify-between'>
        <Link to="/">
          <div className='navbar-brand cursor-pointer' href="#home">
            <img src={logo} alt='logo' width="120" height="30" className="d-inline-block align-top"></img>
          </div>
        </Link>
        <div className='navbar-options flex items-center' href="#home">
            {
              userInfo ? <div className="mx-2"><UserOptions user={userInfo}/></div> : (
                <Link to="/login">
                  <span className='mx-2 flex cursor-pointer'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#1E748C" className="w-6 h-6">
                      <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                    </svg>
                  </span>
                </Link>
              )
            }
        </div>
    </div>
  </header>
}

export default Header