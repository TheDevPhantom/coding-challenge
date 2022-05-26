import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../store/session/authSlice';

const Header = () => {
  const { me } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logoutUser = () => {
    dispatch(logout());
    document.location.reload();
  };

  return (
    <div className='w-full bg-white h-16 flex items-center px-2 justify-between'>
      <div className='flex items-center flex-1'>
        <img src='/challenge-logo.svg' className='h-12' />
        <p className='text-primary font-bold ml-2'>Coding Challenge</p>
      </div>
      <div className='flex items-center flex-1 justify-center'>
        <Link
          to='/'
          className={`${
            window.location.pathname === '/' ? 'text-primary' : ''
          } font-bold mx-4`}
        >
          Home
        </Link>
        {me.role === 'admin' && (
          <Link
            to='/reports'
            className={`${
              window.location.pathname === '/reports' ? 'text-primary' : ''
            } font-bold mx-4`}
          >
            Reports
          </Link>
        )}
      </div>
      <div className='flex items-center flex-1 justify-end gap-4'>
        <div className='flex items-start flex-col justify-center'>
          <p className='opacity-50 font-semibold leading-none'>
            {me.firstname} {me.lastname}
          </p>
          <p className='text-primary font-semibold leading-none'>{me.role}</p>
        </div>
        <button
          onClick={logoutUser}
          className='bg-primary text-white h-8 w-8 flex justify-center items-center rounded-lg'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='20.436'
            height='12.004'
            viewBox='0 0 35.436 27.004'
          >
            <path
              d='M34.945,19.2,23.133,31.008a1.69,1.69,0,0,1-2.883-1.2v-6.75H10.688A1.683,1.683,0,0,1,9,21.375v-6.75a1.683,1.683,0,0,1,1.688-1.687H20.25V6.188a1.691,1.691,0,0,1,2.883-1.2L34.945,16.8A1.7,1.7,0,0,1,34.945,19.2ZM13.5,30.656V27.844A.846.846,0,0,0,12.656,27H6.75A2.248,2.248,0,0,1,4.5,24.75V11.25A2.248,2.248,0,0,1,6.75,9h5.906a.846.846,0,0,0,.844-.844V5.344a.846.846,0,0,0-.844-.844H6.75A6.752,6.752,0,0,0,0,11.25v13.5A6.752,6.752,0,0,0,6.75,31.5h5.906A.846.846,0,0,0,13.5,30.656Z'
              transform='translate(0 -4.499)'
              fill='#fff'
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Header;
