import React from 'react';
import Button from '../Button';

const Modal = ({ showModal, onClose, children, onSubmit }) => {
  return (
    <div
      className={`${
        showModal ? 'flex' : 'hidden'
      } justify-center items-center absolute left-0 top-0 right-0 bottom-0 bg-modal`}
    >
      <div className='w-full max-w-2xl px-4 h-full md:h-auto'>
        <div className='bg-white rounded-lg shadow relative dark:bg-gray-700'>
          <div className='flex items-start justify-between p-5 border-b rounded-t dark:border-gray-600'>
            <h3 className='text-gray-900 text-xl lg:text-2xl font-semibold dark:text-white'>
              Create new User
            </h3>
            <button
              onClick={onClose}
              className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white'
            >
              <svg
                className='w-5 h-5'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fill-rule='evenodd'
                  d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                  clip-rule='evenodd'
                ></path>
              </svg>
            </button>
          </div>
          <div className='p-6 space-y-6'>{children}</div>
          <div className='flex space-x-2 items-center p-6 border-t border-gray-200 rounded-b dark:border-gray-600'>
            <Button onClick={onSubmit}>Submit</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
