import React from 'react'
import Button from './Button'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Signin from './Signin'
import { useState } from 'react'

const Navbar = ({ comingsoon = false }) => {
	const [showSigninModal, setShowSigninModal] = useState(false)
	return (
		<>
			{
				comingsoon ?
					<nav className='px-10 flex justify-center items-center shadow-lg shadow-[#0000000e] w-[90vw] bg-white rounded-b-3xl h-[90px] z-50'>
						<img src="/assets/logo/logo.png" alt="" />
					</nav>
					:
					<nav className='px-10 flex  lg:flex-row flex-col lg:justify-between justify-center items-center shadow-lg shadow-[#0000000e] w-[90vw] bg-white rounded-b-3xl h-[90px] absolute left-1/2 -translate-x-1/2 z-50'>
						<img src="/assets/logo/logo.png" alt="" />
						<div className='w-7/12 h-full flex items-center justify-between'>
							<div className='lg:flex gap-16 hidden'>
								<Link to={"/"}>Home</Link>
								<Link to={"/create-order"}>Create Order</Link>
								<Link to={"/about-us"}>About us</Link>
							</div>
							<div className='flex gap-7 items-center'>
								{!localStorage.getItem("token") && <Button filled={true} text={"SignIn"} onClick={() => setShowSigninModal(true)} />}
								{/* {!localStorage.getItem("token") && <Button text={"SignUp"} onClick={handleSignin}/>} */}
								{localStorage.getItem("token") && <button onClick={() => { localStorage.removeItem("token"); window.location.reload() }}>Logout</button>}
								{/* <Button onClick={handleSignUp} text={"Register "} className={'w-32'} /> */}
							</div>
						</div>
					</nav>
			}
			<Signin showSigninModal={showSigninModal} setShowSigninModal={setShowSigninModal} />
		</>
	)
}

export default Navbar
