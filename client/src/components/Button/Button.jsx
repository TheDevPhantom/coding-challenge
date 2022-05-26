import React from 'react';

const Button = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className='bg-primary px-6 py-3 font-bold text-white rounded-xl min-w-[200px]'
    >
      {children}
    </button>
  );
};

export default Button;
