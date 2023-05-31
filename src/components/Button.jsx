import React from 'react'
import { twMerge } from 'tailwind-merge'

const Button = ({text, onClick, className}) => {
  return (
	<button onClick={onClick} className={twMerge('outline-none rounded-3xl px-6 py-2 text-white bg-accentYellow', className)}>{text}</button>
  )
}

export default Button
