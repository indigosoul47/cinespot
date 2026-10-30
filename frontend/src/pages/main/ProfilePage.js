import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../../components/layouts/Layout';
import Loading from '../../components/main/Loading';
import { fetchUser, updateUser } from '../../store/actions/userActions';
import { USER_UPDATE_FAIL } from '../../store/constants/userConstants';

const ProfilePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userInfo: user } = useSelector(state => state.user);
    const { loading, userProfile: profile } = useSelector(state => state.profile);
    const { loading: updating, error } = useSelector(state => state.userUpdates);

    const [password, setPassword] = useState('');
    const [cPassword, setCPassword] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    const [phoneNumber, setPhoneNumber] = useState();

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const updates = {
            id: profile?._id,
            name: name && (name.trim() !== '') && (name !== profile?.name) ? name : undefined,
            email: email && (email.trim() !== '') && (email !== profile?.email) ? email : undefined,
            phoneNumber: phoneNumber && (phoneNumber.trim() !== '') && (phoneNumber !== profile?.phoneNumber) ? phoneNumber : undefined
        }

        if ((password === cPassword) && password && (password.trim() !== '')) {
            updates.password = password;
        }

        if (Object.keys(updates).filter(key => updates[key] && key !== 'id').length > 0) {
            dispatch(updateUser(updates));
        } else {
            dispatch({
                type: USER_UPDATE_FAIL,
                payload: (password !== cPassword) && password && (password.trim() !== '') ? 'Passwords do not match.' : 'Please enter all information correctly.'
            });
        }

    }

    useEffect(() => {
        if (user) {
            dispatch(fetchUser(user._id));
        } else {
            navigate('/login');
        }
    }, [dispatch, user, navigate]);

    useEffect(() => {
        if (profile) {
            setEmail(profile.email);
            setName(profile.name);
            setPhoneNumber(profile.phoneNumber);
        }
    }, [profile]);

    return (
        <Layout isMain={false}>
            <div className='mx-16'>
                <h1 className='text-4xl flex justify-center items-center' style={{
                    fontFamily: 'Jacksilver, Arial, serif',
                    color: "#7007d6"
                }}>
                    {/* <img src={bull_logo} alt='bull_logo' className='h-32 w-32' /> */}
                    My Profile
                </h1>
                <Link to="/history">
                    <span className='flex justify-center mt-16 text-orange-400 underline' style={{
                        fontFamily: 'JosefinSans, Arial, serif'
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mr-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
                        </svg>
                        View Orders
                    </span>
                </Link>
                {
                    user?.isAdmin && (
                        <Link to="/dashboard">
                            <span className='flex justify-center mt-8 text-orange-400 underline' style={{
                                fontFamily: 'JosefinSans, Arial, serif',
                                color: '#E60033'
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mr-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z" />
                                </svg>
                                Manage Store
                            </span>
                        </Link>
                    )
                }
                {
                    loading || updating ? <Loading /> : (
                        <div className='form flex justify-center'>
                            <form onSubmit={(e) => { handleFormSubmit(e) }} className="w-1/2 mt-10 mb-20">
                                {error && <h1 className='text-lg text-orange-500'>{error}</h1>}
                                <div className='flex p-4 rounded-lg my-10' style={{
                                    background: '#E5E5E5'
                                }}>
                                    <input type='text' placeholder='Name' value={name || ''} onChange={(e) => setName(e.target.value)} className='w-full' style={{
                                        background: 'none'
                                    }} />
                                </div>
                                <div className='flex p-4 rounded-lg my-10' style={{
                                    background: '#E5E5E5'
                                }}>
                                    <input type='email' placeholder='Email' value={email || ''} onChange={(e) => setEmail(e.target.value)} className='w-full' style={{
                                        background: 'none'
                                    }} />
                                </div>
                                <div className='flex p-4 rounded-lg my-10' style={{
                                    background: '#E5E5E5'
                                }}>
                                    <input
                                        type='tel'
                                        placeholder='Mobile (Optional)'
                                        value={phoneNumber || ''}
                                        pattern="[0-9]{10}"
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        className='w-full'
                                        autoComplete="off"
                                        style={{
                                            background: 'none'
                                        }
                                    }/>
                                </div>
                                <div className='flex p-4 rounded-lg my-10' style={{
                                    background: '#E5E5E5'
                                }}>
                                    <input type='password' placeholder='Password' autoComplete="off" onChange={(e) => setPassword(e.target.value)} className='w-full' style={{
                                        background: 'none'
                                    }} />
                                </div>
                                <div className='flex p-4 rounded-lg my-10' style={{
                                    background: '#E5E5E5'
                                }}>
                                    <input type='password' placeholder='Confirm Password' onChange={(e) => setCPassword(e.target.value)} className='w-full' style={{
                                        background: 'none'
                                    }} />
                                </div>
                                <div className='profile-action mt-16 item-center flex justify-center'>
                                    <button className='btn cursor-pointer flex' type='submit'>
                                        <span className='btn-icon mr-4'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill='none' viewBox="0 0 24 24" strokeWidth="1.5" stroke="#22c1c9" className="w-12 h-12">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
                                            </svg>
                                        </span>
                                        <span className='btn-text text-center text-3xl flex relative' style={{
                                            fontFamily: 'Jacksilver, Arial, serif',
                                        }}>
                                            Update Info
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
            </div>
        </Layout>
    )
}

export default ProfilePage