import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Layout from '../../components/layouts/Layout';
import Loading from '../../components/main/Loading';
import { register } from '../../store/actions/userActions';
import { USER_REGISTER_FAIL } from '../../store/constants/userConstants';

const RegisterPage = () => {
  const dispatch = useDispatch();
  
  const [ password, setPassword ] = useState('');
  const [ cPassword, setCPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ name, setName ] = useState('');

  const [ phoneNumber, setPhoneNumber ] = useState();

  const { loading, error } = useSelector(state => state.userRegister);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const emptyCheck = name.trim() !== '' && password.trim() !== '' && cPassword.trim() !== '' && email.trim() !== '';
    const nullCheck = name && password && cPassword && email;

    if(emptyCheck && nullCheck){
        if(password === cPassword){
            dispatch(register(email, password, name, phoneNumber));
        }else{
            dispatch({
                type: USER_REGISTER_FAIL,
                payload: 'Your passwords do not match.'
            });
        }
    }else{
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: 'Please provide all necessary information.'
        });
    }
    
  }

  return (
    <Layout isMain={false}>
        <div className='mx-16'>
            <h1 className='text-4xl flex justify-center items-center' style={{
                fontFamily: 'Jacksilver, Arial, serif',
                color: "#22c1c9"
            }}>
                {/* <img src={bull_logo} alt="bull_logo" className='h-32 w-32'/> */}
                Register
            </h1>
            {
                loading ? <Loading/> : (
                    <div className='form flex justify-center'>
                        <form onSubmit={(e) => {handleFormSubmit(e)}} className="w-1/2 my-20">
                            { error && <h1 className='text-lg text-orange-500'>{error}</h1> }
                            <div className='flex p-4 rounded-lg my-10' style={{
                                background: '#E5E5E5'
                            }}>
                                <input type='text' placeholder='Name' onChange={(e) => setName(e.target.value)} className='w-full'style={{
                                    background: 'none'
                                }}/>
                            </div>
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
                                <input type='tel' placeholder='Mobile (Optional)' onChange={(e) => setPhoneNumber(e.target.value)} className='w-full'style={{
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
                            <div className='flex p-4 rounded-lg my-10' style={{
                                background: '#E5E5E5'
                            }}>
                                <input type='password' placeholder='Confirm Password' onChange={(e) => setCPassword(e.target.value)} className='w-full'style={{
                                    background: 'none'
                                }}/>
                            </div>
                            <div className='register-action mt-16 item-center flex justify-center'>
                                <button className='btn cursor-pointer flex' type='submit'>
                                    <span className='btn-icon mr-4'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill='none' viewBox="0 0 24 24" strokeWidth="1.5" stroke="#E60033" className="w-12 h-12">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
                                        </svg>
                                    </span>
                                    <span className='btn-text text-center text-3xl flex relative' style={{
                                        fontFamily: 'Jacksilver, Arial, serif',
                                    }}>
                                    Sign Up
                                    <span className='btn-bd absolute -bottom-4 -z-10'>
                                        {/* <img src={btn_streak} alt='logo' width="150" height="30" className="-mt-4"></img> */}
                                    </span>
                                    </span>
                                </button>
                            </div>
                        </form>
                    </div>
                )
            }
            <Link to="/login">
                <span className='tag flex justify-center flex-col w-fit mx-auto mb-20 basis-1/3 cursor-pointer items-center'>
                    <span className='heading-text text-center text-2xl mb-4' style={{
                        fontFamily: 'Shockwave, Arial, serif',
                        color: 'black',
                    }}>
                    Already have an account? 
                    </span>
                    {/* <img src={heading_bd} alt='logo' width="300" height="30" className="-z-10 opacity-60 px-4" style={{
                        marginTop: '-1rem'
                    }}></img> */}
                </span>
            </Link>
        </div>
    </Layout>
  )
}

export default RegisterPage