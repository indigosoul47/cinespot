import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../store/actions/userActions';

const Login = () => {

  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');

  const { error } = useSelector(state => state.user);

  const dispatch = useDispatch();

  const handleFormSubmit = (event) => {
    event.preventDefault();

    dispatch(login(email, password));
  }

  return (
    <form onSubmit={(e) => {handleFormSubmit(e)}} className="w-1/2 my-20">
        { error && <h1 className='text-lg text-orange-500'>{error}</h1> }
        <div className='flex p-4 rounded-lg my-10' style={{
            background: '#E5E5E5'
        }}>
            <input type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} className='w-full'style={{
                background: 'none'
            }}/>
        </div>
        <div className='flex p-4 rounded-lg my-10' style={{
            background: '#E5E5E5'
        }}>
            <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} className='w-full'style={{
                background: 'none'
            }}/>
        </div>
        <div className='login-action mt-16 item-center flex justify-center'>
            <button className='btn cursor-pointer flex' type='submit'>
                <span className='btn-icon mr-4'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#7007d6" className="w-12 h-12">
                        <path fillRule="evenodd" d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z" clipRule="evenodd" />
                    </svg>
                </span>
                <span className='btn-text text-center text-3xl flex relative' style={{
                    fontFamily: 'Jacksilver, Arial, serif',
                }}>
                Sign In
                <span className='btn-bd absolute -bottom-4 -z-10'>
                    {/* <img src={btn_streak} alt='logo' width="150" height="30" className="-mt-4"></img> */}
                </span>
                </span>
            </button>
        </div>
    </form>
  )
}

export default Login