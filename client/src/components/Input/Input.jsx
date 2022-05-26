import React from 'react';

const Input = ({ placeholder, onChange, type, value }) => {
  return (
    <input
      onChange={onChange}
      placeholder={placeholder}
      className='bg-indent px-6 py-3 rounded-xl min-w-[200px]'
      type={type ?? 'text'}
      value={value}
    />
  );
};

export default Input;
