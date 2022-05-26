import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { login } from '../../store/session/authSlice';

const Login = () => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { from } = location.state || '/';

  const { me, status } = useSelector((state) => state.auth);

  const loginUser = () => {
    dispatch(login(loginData));
  };

  useEffect(() => {
    if (status === 'success') {
      navigate(from == '/login' ? '/' : from);
    }

    return () => {};
  }, [status]);

  if (status === 'loading-authentication') {
    return <p className='opacity-50 font-bold'>Loading...</p>;
  }

  return (
    <div className='w-screen h-screen flex justify-center items-center flex-col'>
      <img src='/challenge-logo.svg' className='w-40 mb-10' />
      <div className='flex flex-col gap-4 w-full sm:w-[300px]'>
        <p className='text-primary font-bold text-3xl'>Login</p>
        <Input
          placeholder='Username'
          onChange={(e) =>
            setLoginData({ ...loginData, username: e.target.value })
          }
        />
        <Input
          placeholder='Password'
          onChange={(e) =>
            setLoginData({ ...loginData, password: e.target.value })
          }
          type='password'
        />
        <br />
        <Button onClick={loginUser}>Login</Button>
      </div>
    </div>
  );
};

export default Login;
