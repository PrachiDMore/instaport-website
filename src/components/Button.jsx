import React from 'react'
import { twMerge } from 'tailwind-merge'

const Button = ({text, onClick, className, type="button"}) => {
  return (
	<button onClick={onClick} type={type} className={twMerge('outline-none rounded-3xl px-6 py-2 text-white bg-accentYellow hover:shadow-lg shadow-md duration-200 font-semibold', className)}>{text}</button>
  )
}

export default Button
