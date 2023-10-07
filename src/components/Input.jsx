import React from 'react'

const Input = ({id, label, type, placeholder, value, onChange}) => {
  return (
    <div className='w-full flex flex-col items-start'>
      <label htmlFor={id} className='pb-1 text-sm lg:text-base'>{label}</label>
      <input onChange={onChange} value={value} className='w-full outline-none rounded-xl px-7 py-3 border-accentYellow border-2 ' type={type} placeholder={placeholder} id={id} />
    </div>
  )
}

export default Input