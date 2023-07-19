import React from 'react'
import Button from './Button'
import { Link } from 'react-router-dom'

const Navbar = ({ comingsoon = false }) => {
	return (
		<>
			{
				comingsoon ?
					<nav className='px-10 flex justify-center items-center shadow-lg shadow-[#0000000e] w-[90vw] bg-white rounded-b-3xl h-[90px]'>
						<img src="/assets/logo/logo.png" alt="" />
					</nav>
					:
					<nav className='px-10 flex justify-between items-center shadow-lg shadow-[#0000000e] w-[90vw] bg-white rounded-b-3xl h-[90px] absolute left-1/2 -translate-x-1/2'>
						<img src="/assets/logo/logo.png" alt="" />
						<div className='w-6/12 h-full flex items-center justify-between'>
							<div className='flex gap-16'>
								<Link to={"/"}>Home</Link>
								<Link to={"/support"}>Support</Link>
								<Link to={"/create-order"}>Create an Order</Link>
							</div>
							<div className='flex gap-10 items-center'>
								<Link to={"/support"}>SignIn</Link>
								<Button text={"Register "} className={'w-32'} />
							</div>
						</div>
					</nav>
			}
		</>
	)
}

export default Navbar
