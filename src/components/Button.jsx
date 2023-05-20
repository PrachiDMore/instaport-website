import React from 'react'

const Button = ({text, onClick, className}) => {
  return (
	<button onClick={onClick} className={'outline-none rounded-3xl px-6 py-2 text-white bg-[#FFD12E] ' + className}>{text}</button>
  )
}

export default Button
