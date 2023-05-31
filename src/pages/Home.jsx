import React from 'react'
import Navbar from '../components/Navbar'
import Button from '../components/Button'
import Footer from '../components/Footer'

const Home = () => {
	return (
		<>
			<img src="/assets/BG/bg-shape-1.png" className='absolute top-0 left-[-2px]' alt="" />
			<img src="/assets/BG/bg-shape-2.png" className='absolute top-[226px] left-[179px]' alt="" />
			<section className='h-screen w-screen relative Poppins flex flex-col border-b-2'>
				<Navbar />
				<div className='custom-height w-screen top-[90px] left-0 absolute flex md:flex-row flex-col-reverse justify-between px-5 md:px-16 lg:px-24'>
					<div className='h-full w-full md:w-1/2 flex justify-center flex-col md:pl-8 pl-0'>
						<h1 className='md:text-6xl text-3xl font-semibold  md:text-left text-center'><span className='font-extralight'>The largest & trusted</span> Courier Delivery<br />Service.</h1>
						<p className='mt-8 text-lg md:text-left text-center'>We deliver your products safely to your <br className='md:block hidden' /> home in a reasonable time and safely.</p>
						<Button text={"Create a Order"} className={"w-48 py-3 mt-10 mx-auto md:mx-0"} />
					</div>
					<div className='md:flex h-max md:h-full w-full md:w-1/2 items-center'>
						<img src="/assets/hero-img.png" alt="" />
					</div>
				</div>
			</section>
			<section className='h-auto w-screen relative Poppins flex flex-col border-b-2 px-5 md:px-28'>
				<img src="/assets/BG/bg-shape-3.png" className='absolute bottom-4 left-0 hidden md:block w-[80%] h-[100%] z-0' alt="" />
				<img src="/assets/BG/bg-shape-4.png" className='absolute top-16 right-16 h-[200px] aspect-square md:h-[27%] md:w-[14%] z-0' alt="" />
				<h1 className='z-50 text-3xl md:text-5xl leading-tight pt-9 font-medium'>We know how assist with <br className='md:block hidden'/> any kind of business.</h1>
				<div className='grid grid-cols-2 md:grid-cols-4 gap-x-5 md:gap-x-20 gap-y-11 z-50 p-0 py-5 md:p-5 md:pb-11'>
					<div className='flex flex-col items-center'>
						<div className='bg-white rounded-xl p-[20px] w-full h-full flex justify-center items-center'>
							<img className='h-[100px] aspect-square md:h-[60%]' src="/assets/box1.png" alt="" />
						</div>
						<p className='text-base md:text-lg pt-2 font-medium'>E-Commerce</p>
					</div>
					<div className='flex flex-col items-center'>
						<div className='bg-white rounded-xl p-[20px] w-full h-full flex justify-center items-center'>
							<img className='h-[100px] aspect-square md:h-[60%]' src="/assets/apple.png" alt="" />
						</div>
						<p className='text-base md:text-lg pt-2 font-medium'>Vegetables</p>
					</div>
					<div className='flex flex-col items-center'>
						<div className='bg-white rounded-xl p-[20px] w-full h-full flex justify-center items-center'>
							<img className='h-[100px] aspect-square md:h-[60%]' src="/assets/juice.png" alt="" />
						</div>
						<p className='text-base md:text-lg pt-2 font-medium'>Food</p>
					</div>
					<div className='flex flex-col items-center'>
						<div className='bg-white rounded-xl p-[20px] w-full h-full flex justify-center items-center'>
							<img className='h-[100px] aspect-square md:h-[60%]' src="/assets/medicine.png" alt="" />
						</div>
						<p className='text-base md:text-lg pt-2 font-medium'>Medicines</p>
					</div>
					<div className='flex flex-col items-center'>
						<div className='bg-white rounded-xl p-[20px] w-full h-full flex justify-center items-center'>
							<img className='h-[100px] aspect-square md:h-[60%]' src="/assets/box1.png" alt="" />
						</div>
						<p className='text-base md:text-lg pt-2 font-medium'>E-Commerce</p>
					</div>
					<div className='flex flex-col items-center'>
						<div className='bg-white rounded-xl p-[20px] w-full h-full flex justify-center items-center'>
							<img className='h-[100px] aspect-square md:h-[60%]' src="/assets/apple.png" alt="" />
						</div>
						<p className='text-base md:text-lg pt-2 font-medium'>Vegetables</p>
					</div>
					<div className='flex flex-col items-center'>
						<div className='bg-white rounded-xl p-[20px] w-full h-full flex justify-center items-center'>
							<img className='h-[100px] aspect-square md:h-[60%]' src="/assets/juice.png" alt="" />
						</div>
						<p className='text-base md:text-lg pt-2 font-medium'>Food</p>
					</div>
					<div className='flex flex-col items-center'>
						<div className='bg-white rounded-xl p-[20px] w-full h-full flex justify-center items-center'>
							<img className='h-[100px] aspect-square md:h-[60%]' src="/assets/medicine.png" alt="" />
						</div>
						<p className='text-base md:text-lg pt-2 font-medium'>Medicines</p>
					</div>
				</div>
			</section>
			<section className='h-screen w-screen relative Poppins flex flex-col border-b-2 px-28 py-10'>
				<img src="/assets/BG/bg-shape-5.png" className='absolute left-[33%] top-5 z-0' alt="" />
				<h1 className='text-5xl font-medium'>Calculate the Fare</h1>
				<p className='text-lg pt-2'>No extra cost for urgent delivery</p>
				<div className='flex w-full h-full items-center'>
					<div className='w-1/2 h-full relative'>
						<img className='absolute right-28 top-16' src="/assets/section3.png" alt="" />
					</div>
					<div className='w-1/2 h-auto flex justify-center items-center z-50'>
						<div className='bg-white z-50 border-2 w-[90%] custom-shadow rounded-3xl p-12'>
							<div className='flex flex-col pb-3'>
								<label className='font-medium pb-2 text-lg' htmlFor="">Pickup point:</label>
								<input className='py-1 border-b-2 outline-none' type="text" name="" id="" placeholder='Enter pickup Point' />
							</div>
							<div className='flex flex-col py-3'>
								<label className='font-medium py-2 text-lg' htmlFor="">Dropup point:</label>
								<input className='py-1 border-b-2 outline-none' type="text" name="" id="" placeholder='Enter Drop Point' />
							</div>
							<div className='flex justify-center items-center pt-5'>
								<Button text={"Calculate"} />
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className='h-screen w-screen relative Poppins flex flex-col border-b-2 px-28 py-9'>
				<img src="/assets/BG/bg-shape-6.png" className='absolute left-0 bottom-[63%] z-0' alt="" />
				<div className='bg-[gradient-bg] w-full h-full'>
					<h1>Send your parcel Hassel-free!!</h1>
					<ul>
						<li>Automated Delivery- Instead of calling or emailing the carrier, customers may use the app to arrange package pickups.</li>
						<li>Contactless Delivery- Customers can request contactless delivery, which does not require signatures.</li>
					</ul>
				</div>
			</section>
			<section className='h-auto w-screen relative Poppins flex flex-col border-b-2 px-5 md:px-28 py-9 pb-12'>
				<img src="/assets/BG/bg-shape-7.png" className='absolute right-80 bottom-96 z-0' alt="" />
				<h1 className='text-3xl md:text-5xl pb-4 font-medium'>Bulk Order</h1>
				<div className='md:flex hidden bg-accentYellow z-50 rounded-3xl px-6 py-12 relative'>
					<div className='w-[25%] border-r-2 flex justify-center items-center'>
						<Button text={"Give a call"} className={" text-accentYellow bg-white"} />
					</div>
					<div className='w-[50%] flex flex-col justify-center p-5 px-14 text-white'>
						<h1 className='text-3xl font-medium'>+98 7389782928</h1>
						<p className='text-lg'>Give us a call, We are just a call away!!</p>
					</div>
					<div className='w-[25%] z-50 absolute bottom-0 right-10'>
						<img src="/assets/section5.png" alt="" />
					</div>
				</div>
				<div className='md:hidden flex flex-col bg-accentYellow z-50 rounded-3xl px-5 py-6 relative'>
					<div className='z-50 mb-5'>
						<img src="/assets/section5.png" alt="" />
					</div>
					<div className='w-full flex flex-col justify-center text-white text-center'>
						<h1 className='text-2xl font-medium'>+98 7389782928</h1>
						<p className='text-base'>Give us a call, We are just a call away!!</p>
					</div>
					<div className='flex justify-center items-center'>
						<Button text={"Give a call"} className={"mt-3  text-accentYellow bg-white"} />
					</div>
				</div>
			</section>
			<section className='h-auto w-screen relative Poppins flex flex-col border-b-2 px-28 py-12'>
				<img src="/assets/BG/bg-shape-8.png" className='absolute right-0 top-[60%] z-0 ' alt="" />
				<div className='brands-gradient border-[#F2F3D4] border-4 rounded-3xl p-12 px-24 flex flex-col items-center z-50'>
					<h1 className='text-5xl  pb-4 font-medium'>Serving the brands like</h1>
					<div className='justify-items-center grid grid-cols-3 w-full gap-14 pt-12 pb-8 '>
						<div>
							<img src="/assets/airtable-logo.png" alt="" />
						</div>
						<div>
							<img src="/assets/sketch-logo.png" alt="" />
						</div>
						<div>
							<img src="/assets/dribble-logo.png" alt="" />
						</div>
						<div>
							<img src="/assets/slack-logo.png" alt="" />
						</div>
						<div>
							<img src="/assets/livechat-logo.png" alt="" />
						</div>
						<div>
							<img src="/assets/gitlab-logo.png" alt="" />
						</div>
					</div>
				</div>
			</section>
			<section className='h-auto w-screen relative Poppins flex flex-col border-b-2 px-28 py-12'>

			</section>
			<Footer/>
		</>
	)
}

export default Home
