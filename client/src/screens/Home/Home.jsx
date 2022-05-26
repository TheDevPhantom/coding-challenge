import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Input from '../../components/Input';
import Modal from '../../components/Modal';
import Pagination from '../../components/Pagination';
import TableRow from '../../components/TableRow';
import api, { usersUrl } from '../../constants/api';
import {
  updateFilterBy,
  updatePage,
  updateSearch,
  updateSort,
} from '../../store/session/filtersSlice';
import { createUser, getUsers } from '../../store/session/usersSlice';

const Home = () => {
  const [isCreateNewUser, setIsCreateNewUser] = useState(false);
  const [newUserData, setNewUserData] = useState({});
  const dispatch = useDispatch();
  const { token, me } = useSelector((state) => state.auth);
  const { users, count, total } = useSelector((state) => state.users);
  const { page, sort, limit, filterBy, search } = useSelector(
    (state) => state.filters
  );
  const [csvLink, setCsvLink] = useState();

  useEffect(() => {
    setCsvLink();
    dispatch(getUsers()).then(async () => {
      const { data } = await api.get(`${usersUrl}/csv`, {
        headers: {
          Authorization: `Bearer ${token}`,
          params: { page, sort, limit },
        },
      });
      const downloadUrl = window.URL.createObjectURL(new Blob([data]));
      setCsvLink(downloadUrl);
    });
    return () => {};
  }, [sort, page]);

  const createNewUser = () => {
    console.log(newUserData);
    dispatch(createUser(newUserData)).then((data) => {
      console.log(data);
      setNewUserData({});
      setIsCreateNewUser(false);
    });
  };

  const updateFilterByValue = (value) => {
    dispatch(updateFilterBy(value));
    dispatch(updateSearch());
  };

  return (
    <>
      <Header />
      <Modal
        showModal={isCreateNewUser}
        onClose={() => setIsCreateNewUser(!isCreateNewUser)}
        onSubmit={createNewUser}
      >
        <div className='flex flex-col gap-4'>
          <Input
            placeholder='First Name'
            onChange={(val) =>
              setNewUserData({ ...newUserData, firstname: val.target.value })
            }
            value={newUserData.firstname ?? ''}
          />
          <Input
            placeholder='Last Name'
            onChange={(val) =>
              setNewUserData({ ...newUserData, lastname: val.target.value })
            }
            value={newUserData.lastname ?? ''}
          />
          <Input
            placeholder='Username'
            onChange={(val) =>
              setNewUserData({ ...newUserData, username: val.target.value })
            }
            value={newUserData.username ?? ''}
          />
          <Input
            placeholder='Email'
            onChange={(val) =>
              setNewUserData({ ...newUserData, email: val.target.value })
            }
            value={newUserData.email ?? ''}
          />
          <Input
            placeholder='Password'
            onChange={(val) =>
              setNewUserData({ ...newUserData, password: val.target.value })
            }
            type='password'
            value={newUserData.password ?? ''}
          />
          <select
            name='role'
            onChange={(val) =>
              setNewUserData({ ...newUserData, role: val.target.value })
            }
            className='bg-indent px-6 py-3 rounded-xl min-w-[200px]'
            value={newUserData.role ?? ''}
          >
            <option value=''>Select a role</option>
            <option value='admin'>Admin</option>
            <option value='user'>User</option>
          </select>
        </div>
      </Modal>
      <section className='antialiased mx-auto text-gray-600 h-screen px-4 w-screen container'>
        <div className='flex flex-col justify-center h-full'>
          <div className='w-full mx-auto bg-white shadow-lg rounded-xl border border-gray-200'>
            <header className='px-5 py-4 border-b border-gray-100 flex justify-between'>
              <div className='flex flex-col items-start'>
                <h2 className='font-semibold text-gray-800'>Users</h2>
                <div className='flex gap-4 items-center'>
                  <select
                    name='filterBy'
                    onChange={(val) => updateFilterByValue(val.target.value)}
                    className='rounded-xl min-w-[100px]'
                    value={filterBy}
                  >
                    <option value=''>Filter By</option>
                    <option value='firstname'>First Name</option>
                    <option value='lastname'>Last Name</option>
                    <option value='username'>Username</option>
                    <option value='email'>Email</option>
                    <option value='createdAt'>Date Created</option>
                    <option value='role'>Role</option>
                    <option value='active'>Status</option>
                  </select>
                  {filterBy === 'active' && (
                    <>
                      <input
                        onChange={(val) =>
                          dispatch(updateSearch(val.target.checked))
                        }
                        id='active'
                        type={'checkbox'}
                      />
                      <label for='active'>Is Active</label>
                    </>
                  )}
                  {filterBy === 'role' && (
                    <select
                      name='role'
                      onChange={(val) =>
                        dispatch(updateSearch(val.target.value))
                      }
                      className='rounded-xl min-w-[200px]'
                      value={search ?? ''}
                    >
                      <option value=''>Select a role</option>
                      <option value='admin'>Admin</option>
                      <option value='user'>User</option>
                    </select>
                  )}
                  {filterBy === 'createdAt' && (
                    <>
                      <input
                        type={'date'}
                        onChange={(val) =>
                          dispatch(updateSearch(val.target.value.split('T')[0]))
                        }
                        value={search ?? ''}
                      />
                    </>
                  )}
                  {filterBy !== 'active' &&
                    filterBy !== 'role' &&
                    filterBy !== 'createdAt' &&
                    filterBy !== '' && (
                      <input
                        className='border-2 px-2 rounded-lg'
                        placeholder='Search'
                        onChange={(val) =>
                          dispatch(updateSearch(val.target.value))
                        }
                        value={search ?? ''}
                      />
                    )}
                  <button
                    onClick={() => dispatch(getUsers())}
                    className='font-bold text-primary'
                  >
                    Search
                  </button>
                </div>
              </div>
              <div className='flex items-center gap-4'>
                {csvLink && (
                  <a
                    href={csvLink}
                    download='userData.csv'
                    className='text-primary font-bold'
                  >
                    Download .csv
                  </a>
                )}
                {me.role === 'admin' && (
                  <Button
                    onClick={() => {
                      setIsCreateNewUser(!isCreateNewUser);
                    }}
                  >
                    New User
                  </Button>
                )}
              </div>
            </header>
            <div className='p-3'>
              <div className='overflow-x-auto'>
                <table className='table-auto w-full'>
                  <thead className='text-xs font-semibold uppercase text-gray-400 bg-gray-50'>
                    <tr>
                      <th className='p-2 whitespace-nowrap cursor-pointer hover:bg-gray-200'>
                        <div
                          className='font-semibold text-left'
                          onClick={() => dispatch(updateSort('firstname'))}
                        >
                          First Name {sort == 'firstname' && <>&#9660;</>}{' '}
                          {sort == '-firstname' && <>&#9650;</>}
                        </div>
                      </th>
                      <th
                        className='p-2 whitespace-nowrap cursor-pointer hover:bg-gray-200'
                        onClick={() => dispatch(updateSort('lastname'))}
                      >
                        <div className='font-semibold text-left'>
                          Last Name {sort == 'lastname' && <>&#9660;</>}{' '}
                          {sort == '-lastname' && <>&#9650;</>}
                        </div>
                      </th>
                      <th
                        className='p-2 whitespace-nowrap cursor-pointer hover:bg-gray-200'
                        onClick={() => dispatch(updateSort('username'))}
                      >
                        <div className='font-semibold text-left'>
                          username {sort == 'username' && <>&#9660;</>}{' '}
                          {sort == '-username' && <>&#9650;</>}
                        </div>
                      </th>
                      <th
                        className='p-2 whitespace-nowrap cursor-pointer hover:bg-gray-200'
                        onClick={() => dispatch(updateSort('createdAt'))}
                      >
                        <div className='font-semibold text-left'>
                          Date Created {sort == 'createdAt' && <>&#9660;</>}{' '}
                          {sort == '-createdAt' && <>&#9650;</>}
                        </div>
                      </th>
                      <th className='p-2 whitespace-nowrap cursor-pointer hover:bg-gray-200'>
                        <div
                          className='font-semibold text-left'
                          onClick={() => dispatch(updateSort('role'))}
                        >
                          Role {sort == 'role' && <>&#9660;</>}{' '}
                          {sort == '-role' && <>&#9650;</>}
                        </div>
                      </th>
                      <th
                        className='p-2 whitespace-nowrap cursor-pointer hover:bg-gray-200'
                        onClick={() => dispatch(updateSort('active'))}
                      >
                        <div className='font-semibold text-left'>
                          Status {sort == 'active' && <>&#9660;</>}{' '}
                          {sort == '-active' && <>&#9650;</>}
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className='text-sm divide-y divide-gray-100'>
                    {users.map((user) => (
                      <TableRow key={user.id} user={user} />
                    ))}
                  </tbody>
                </table>
                <Pagination
                  nextPage={() => {
                    if (page != Math.ceil(total / limit)) {
                      dispatch(updatePage(page + 1));
                    }
                  }}
                  previousPage={() => {
                    if (page != 1) {
                      dispatch(updatePage(page - 1));
                    }
                  }}
                  selectedPage={(index) => {
                    dispatch(updatePage(index));
                  }}
                  total={total}
                  count={users.length}
                  currentPage={page}
                  limit={limit}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
