import React from 'react'
import Navbar from '../components/Navbar'

const ComingSoon = () => {
	return (
		<>
			<section className='flex flex-col items-center h-auto w-screen Poppins bg-[#FFFFD0]'>
				<Navbar comingsoon={true} />
				<section className='custom-height w-screen flex flex-col items-center px-24'>
					<img src="/coming-soon.png" className='h-[60vh]' alt="" />
					<h1 className='text-6xl font-bold'>Coming Soon</h1>
				</section>
			</section>
		</>
	)
}

export default ComingSoon
