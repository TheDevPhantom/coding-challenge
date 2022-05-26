import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const TableRow = ({ user }) => {
  return (
    <tr>
      <td className='p-2 whitespace-nowrap'>
        <div className='flex items-center'>
          <Link to={`/user/${user.id}`} className='font-medium text-primary'>
            {user.firstname}
          </Link>
        </div>
      </td>
      <td className='p-2 whitespace-nowrap'>
        <div className='flex items-center'>
          <div className='font-medium text-gray-800'>{user.lastname}</div>
        </div>
      </td>
      <td className='p-2 whitespace-nowrap'>
        <div className='text-left'>{user.username}</div>
      </td>
      <td className='p-2 whitespace-nowrap'>
        <div className='text-left'>
          {moment(user.createdAt).format('DD, MMM yyyy')}
        </div>
      </td>
      <td className='p-2 whitespace-nowrap'>
        <div className='text-left font-medium'>{user.role}</div>
      </td>
      <td className='p-2 whitespace-nowrap'>
        <div className='text-left'>{user.active ? 'Active' : 'Inactive'}</div>
      </td>
    </tr>
  );
};

export default TableRow;
