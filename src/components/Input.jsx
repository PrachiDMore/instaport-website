import React from 'react'

const Input = ({id, label, type, placeholder}) => {
  return (
    <div className='w-full flex flex-col'>
      <label htmlFor={id} className='pb-2'>{label}</label>
      <input className='outline-none rounded-xl px-7 py-3 border-accentYellow border-2 ' type={type} placeholder={placeholder} id={id} />
    </div>
  )
}

export default Input