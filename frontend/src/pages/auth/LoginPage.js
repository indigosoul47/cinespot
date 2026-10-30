import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../../components/layouts/Layout';
import Loading from '../../components/main/Loading';
import Login from '../../components/custom/user/Login';

const LoginPage = () => {
    const navigate = useNavigate();

    const { loading, userInfo: user } = useSelector(state => state.user);

    useEffect(() => {
        if(user){
            navigate('/');
        }
    }, [user, navigate]);

  return (
    <Layout isMain={false}>
        <div className='mx-16'>
            <h1 className='text-4xl flex justify-center items-center' style={{
                fontFamily: 'Jacksilver, Arial, serif',
                color: "#e8983f"
            }}>
                {/* <img src={bull_logo} className='h-32 w-32'/> */}
                Login
            </h1>
            {
                loading ? <Loading/> : (
                    <div className='form flex justify-center'>
                        <Login/>
                    </div>
                )
            }
            <Link to="/register">
                <span className='tag flex justify-center flex-col w-fit mx-auto mb-20 basis-1/3 cursor-pointer items-center'>
                    <span className='heading-text text-center text-2xl mb-4' style={{
                        fontFamily: 'Shockwave, Arial, serif',
                        color: 'black',
                    }}>
                    Register! 
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

export default LoginPage