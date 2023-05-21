import React from 'react'
import Navbar from '../components/Navbar'
import Button from '../components/Button'

const Home = () => {
	return (
		<>
			<img src="/assets/BG/bg-shape-1.png" className='absolute top-0 left-[-2px]' alt="" />
			<img src="/assets/BG/bg-shape-2.png" className='absolute top-[226px] left-[179px]' alt="" />
			<section className='h-screen w-screen relative Poppins flex flex-col border-b-2'>
				<Navbar />
				<div className='custom-height w-screen top-[90px] left-0 absolute flex justify-between px-24'>
					<div className='h-full w-1/2 flex justify-center flex-col pl-8'>
						<h1 className='text-6xl font-semibold'><span className='font-extralight'>The largest & trusted</span> Courier Delivery<br/>Service.</h1>
						<p className='mt-8 text-lg'>We deliver your products safely to your <br /> home in a reasonable time and safely..</p>
						<Button text={"Create a Order"} className={"w-48 py-3 mt-10"}/>
					</div>
					<div className='h-full w-1/2 flex items-center'>
						<img src="/assets/hero-img.png" alt="" />
					</div>
				</div>
			</section>
		</>
	)
}

export default Home
