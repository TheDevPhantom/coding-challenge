import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Input from '../../components/Input';
import api, { usersUrl } from '../../constants/api';
import {
  deleteUser,
  getUsers,
  updateUser,
} from '../../store/session/usersSlice';

const User = () => {
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const { token, me } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getUserDetails();

    return () => {};
  }, [id]);

  const getUserDetails = async () => {
    const { data } = await api.get(`${usersUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setUserInfo(data.data);
  };

  const deleteCurrentUser = () => {
    dispatch(deleteUser(id)).then(() => {
      navigate('/');
    });
  };

  const updateUserDetails = () => {
    dispatch(updateUser(userInfo)).then(() => {
      setIsEdit(false);
    });
  };

  return (
    <>
      <Header />
      <div className='container flex mx-auto p-2 md:p-20 flex-col justify-start items-start text-left'>
        <Link to='/' className='text-primary font-bold'>
          Go Back
        </Link>
        <p className='text-3xl font-bold'>
          {userInfo.firstname} {userInfo.lastname}
        </p>
        <br />
        <div className='flex border-b-2 w-full py-4 items-center'>
          <p className='flex-1'>username:</p>
          {isEdit ? (
            <input
              className='rounded-md px-2 py-1 border border-gray-300 bg-transparent'
              placeholder='Username'
              value={userInfo.username}
              onChange={(val) =>
                setUserInfo({ ...userInfo, username: val.target.value })
              }
            />
          ) : (
            <p className='text-primary font-bold'>{userInfo.username}</p>
          )}
        </div>
        <div className='flex gap-10 border-b-2 w-full py-4 items-center'>
          <p className='flex-1'>email:</p>
          {isEdit ? (
            <input
              className='rounded-md px-2 py-1 border border-gray-300 bg-transparent'
              placeholder='Email'
              value={userInfo.email}
              onChange={(val) =>
                setUserInfo({ ...userInfo, email: val.target.value })
              }
            />
          ) : (
            <p className='text-primary font-bold'>{userInfo.email}</p>
          )}
        </div>
        <div className='flex gap-10 border-b-2 w-full py-4 items-center'>
          <p className='flex-1'>Firstname:</p>
          {isEdit ? (
            <input
              className='rounded-md px-2 py-1 border border-gray-300 bg-transparent'
              placeholder='Firstname'
              value={userInfo.firstname}
              onChange={(val) =>
                setUserInfo({ ...userInfo, firstname: val.target.value })
              }
            />
          ) : (
            <p className='text-primary font-bold'>{userInfo.firstname}</p>
          )}
        </div>
        <div className='flex gap-10 border-b-2 w-full py-4 items-center'>
          <p className='flex-1'>Lastname:</p>
          {isEdit ? (
            <input
              className='rounded-md px-2 py-1 border border-gray-300 bg-transparent'
              placeholder='Lastname'
              value={userInfo.lastname}
              onChange={(val) =>
                setUserInfo({ ...userInfo, lastname: val.target.value })
              }
            />
          ) : (
            <p className='text-primary font-bold'>{userInfo.lastname}</p>
          )}
        </div>
        <div className='flex gap-10 border-b-2 w-full py-4 items-center'>
          <p className='flex-1'>Role:</p>
          {isEdit ? (
            <select
              className='rounded-md px-2 py-1 border border-gray-300 bg-transparent'
              placeholder='Role'
              value={userInfo.role}
              onChange={(val) =>
                setUserInfo({ ...userInfo, role: val.target.value })
              }
            >
              <option value='admin'>Admin</option>
              <option value='user'>User</option>
            </select>
          ) : (
            <p className='text-primary font-bold'>{userInfo.role}</p>
          )}
        </div>
        <div className='flex gap-10 border-b-2 w-full py-4 items-center'>
          <p className='flex-1'>Status:</p>
          {isEdit ? (
            <>
              <input
                onChange={(val) =>
                  setUserInfo({ ...userInfo, active: val.target.checked })
                }
                id='active'
                type={'checkbox'}
                checked={userInfo.active}
              />
              <label for='active'>Is Active</label>
            </>
          ) : (
            <p className='text-primary font-bold'>
              {userInfo.active ? 'Active' : 'Inactive'}
            </p>
          )}
        </div>
        <div className='flex gap-10 border-b-2 w-full py-4 items-center'>
          <p className='flex-1'>Date Created:</p>
          <p className='text-primary font-bold'>
            {moment(userInfo.createdAt).format('DD, MMM YYYY')}
          </p>
        </div>
        <div className='flex gap-10 border-b-2 w-full py-4 items-center'>
          <p className='flex-1'>Date Updated:</p>
          <p className='text-primary font-bold'>
            {moment(userInfo.updatedAt).format('DD, MMM YYYY')}
          </p>
        </div>
        {me.role === 'admin' && (
          <>
            {isEdit ? (
              <div className='flex space-x-2 items-center py-6 border-t border-gray-200 rounded-b dark:border-gray-600'>
                <button
                  id='btn-save'
                  onClick={updateUserDetails}
                  className='text-primary focus:ring-4 rounded-lg border-2 border-primary text-sm font-medium px-5 py-2.5'
                >
                  Save
                </button>
                <button
                  id='btn-cancel'
                  onClick={() => setIsEdit(!isEdit)}
                  className='text-gray-400 focus:ring-4 rounded-lg border-2 border-gray-400 text-sm font-medium px-5 py-2.5'
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className='flex space-x-2 items-center py-6 border-t border-gray-200 rounded-b dark:border-gray-600'>
                <button
                  id='btn-edit'
                  onClick={() => setIsEdit(!isEdit)}
                  className='text-primary focus:ring-4 rounded-lg border-2 border-primary text-sm font-medium px-5 py-2.5'
                >
                  Edit
                </button>
                <button
                  id='btn-delete'
                  onClick={deleteCurrentUser}
                  className='text-red-500 focus:ring-4 rounded-lg border-2 border-red-500 text-sm font-medium px-5 py-2.5'
                >
                  Delete
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default User;
