import React from 'react'
import Navbar from '../components/Navbar'
import Button from '../components/Button'
import Footer from '../components/Footer'
import { GrLocation } from 'react-icons/gr'
import { BsFillBox2Fill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

const Home = () => {
	const [distance, setDistance] = useState(0);
	const [calculationLoading, setCalculationLoading] = useState(false);
	const [pricingData, setPricingData] = useState();

	const calculateRate = () => {
		try {
			setCalculationLoading(true);
			const google = window.google;

			const directionsService = new google.maps.DirectionsService();

			directionsService.route(
				{
					origin: { lat: pickupAddress.latitude, lng: pickupAddress.longitude },
					destination: { lat: dropAddress.latitude, lng: dropAddress.longitude },
					travelMode: google.maps.TravelMode.DRIVING,
				},
				(response, status) => {
					if (status === 'OK') {
						const route = response.routes[0];
						if (route && route.legs && route.legs.length > 0) {
							setDistance((route.legs[0].distance.value / 1000).toFixed(2));
							axios("https://insta-port-backend-api.vercel.app/price/get", {
								method: "GET"
							})
								.then((res) => {
									if (res.data.error) return
									setPricingData(res.data?.priceManipulation)
								})
						}
					} else {
						alert('Directions request failed due to ' + status);
					}
				}
			);
			setCalculationLoading(false)
		} catch (error) {
			alert("Something went wrong! Try reloading the page!")
		}

	}
	const addressInitialState = {
		text: "",
		latitude: 0,
		longitude: 0,
	}
	const [pickupAddress, setPickupAddress] = useState(addressInitialState);
	const [dropAddress, setDropAddress] = useState(addressInitialState);
	return (
		<>
			<div className='w-screen overflow-x-hidden'>
				<img src="/assets/BG/bg-shape-1.png" className='absolute top-0 left-[-2px]' alt="" />
				<img src="/assets/BG/bg-shape-2.png" className='lg:block hidden absolute top-[226px] left-[179px]' alt="" />
			</div>

			{/* section-1 */}
			<section className='h-screen w-full relative Poppins flex flex-col border-b-2'>
				<Navbar />
				<div className='custom-height w-screen top-[90px] left-0 absolute flex md:flex-row flex-col-reverse justify-between px-5 md:px-16 lg:px-24'>
					<div className='h-full w-full md:w-1/2 flex justify-center flex-col md:pl-8 pl-0'>
						<h1 className='md:text-6xl text-3xl font-semibold  md:text-left text-center'><span className='font-extralight'>The Fast & Secured</span> Courier Delivery<br />Service.</h1>
						<p className='mt-8 text-lg md:text-left text-center'>We deliver your products safely to your <br className='md:block hidden' /> home in a reasonable time and safely.</p>
						<div className='w-full flex lg:justify-start justify-center'>
							<Link to={"/create-order"}><Button text={"Create a Order"} className={"w-48 py-3 mt-10 mx-auto md:mx-0"} /></Link>
						</div>
					</div>
					<div className='md:flex h-max md:h-full w-full md:w-1/2 items-center'>
						<img src="/assets/hero-img.png" alt="" />
					</div>
				</div>
			</section>



			{/* Calculate the Fare section-3 */}
			<section className='overflow-x-hidden w-full relative Poppins flex flex-col border-b-2 px-28 py-10 '>
				<img src="/assets/BG/bg-shape-5.png" className='absolute left-[33%] top-5 z-0' alt="" />
				<h1 className='text-3xl md:text-5xl font-semibold'>Calculate the Fare</h1>
				<p className='text-lg pt-2'>No extra cost for urgent delivery</p>
				<div className='flex w-full h-full items-center'>
					<div className='w-1/2 h-full flex items-center justify-center'>
						<img className='h-[28rem]' src="/assets/section3.png" alt="" />
					</div>
					<div className='w-1/2 h-auto flex justify-center items-center z-50'>
						<div className='bg-white z-50 border-2 w-[90%] custom-shadow rounded-3xl p-12'>
							<div className='flex flex-col pb-3 relative'>
								<div className='absolute right-3 bottom-6 '>
									<GrLocation className='text-accentYellow' />
								</div>
								<div className='flex gap-2 items-baseline'>
									<span className='text-accentYellow'><BsFillBox2Fill /></span>
									<label className='font-medium pb-2 text-lg' htmlFor="">Pickup point:</label>
								</div>
								<PlacesAutocomplete
									value={pickupAddress.text}
									onChange={(e) => {
										setPickupAddress({ ...pickupAddress, text: e })
									}}
									onSelect={(e) => {
										setPickupAddress({ ...pickupAddress, text: e })
										geocodeByAddress(e)
											.then(results => getLatLng(results[0]))
											.then(latLng => {
												console.log({ ...pickupAddress, text: e, latitude: latLng.lat, longitude: latLng.lng })
												setPickupAddress({ ...pickupAddress, text: e, latitude: latLng.lat, longitude: latLng.lng })
											})
											.catch(error => console.error('Error', error));
									}}
									debounce={200}
									shouldFetchSuggestions={true}
								>
									{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
										<div className='relative w-full z-[1000]'>
											<input
												{...getInputProps({
													placeholder: 'Enter your pickup address',
													className: 'w-full location-search-input outline-none py-3 focus:border-accentYellow border-b-2 w-full',
												})}
											/>
											<div className="absolute autocomplete-dropdown-container w-full shadow-lg">
												{loading && <div className='w-full px-3 py-3 bg-white'>Loading...</div>}
												{suggestions.map((suggestion, index) => {
													const className = suggestion.active
														? 'suggestion-item--active px-3 py-3'
														: 'suggestion-item px-3 py-3';
													// inline style for demonstration purpose
													const style = suggestion.active
														? { backgroundColor: '#eee', cursor: 'pointer' }
														: { backgroundColor: '#ffffff', cursor: 'pointer' };
													return (
														<div
															key={index}
															{...getSuggestionItemProps(suggestion, {
																className,
																style,
															})}
														>
															<span>{suggestion.description}</span>
														</div>
													);
												})}
											</div>
										</div>
									)}
								</PlacesAutocomplete>
							</div>
							<div className='flex flex-col py-3 relative'>
								<div className='absolute right-3 bottom-6 '>
									<GrLocation className='text-accentYellow' />
								</div>
								<div className='flex gap-2 items-baseline'>
									<div className='text-accentYellow'><BsFillBox2Fill /></div>
									<lable className='font-medium py-2 text-lg ' htmlFor="">Drop point:</lable>
								</div>
								<PlacesAutocomplete
									value={dropAddress.text}
									onChange={(e) => {
										setDropAddress({ ...dropAddress, text: e })
									}}
									onSelect={(e) => {
										setDropAddress({ ...dropAddress, text: e })
										geocodeByAddress(e)
											.then(results => getLatLng(results[0]))
											.then(latLng => {
												setDropAddress({ ...dropAddress, text: e, latitude: latLng.lat, longitude: latLng.lng })
											})
											.catch(error => console.error('Error', error));
									}}
									debounce={200}
									shouldFetchSuggestions={true}
								>
									{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
										<div className='relative w-full z-[990]'>
											<input
												{...getInputProps({
													placeholder: 'Enter your drop address',
													className: 'w-full location-search-input outline-none py-3 focus:border-accentYellow border-b-2 w-full',
												})}
											/>
											<div className="absolute autocomplete-dropdown-container w-full shadow-lg">
												{loading && <div className='w-full px-3 py-3 bg-white'>Loading...</div>}
												{suggestions.map((suggestion, index) => {
													const className = suggestion.active
														? 'suggestion-item--active px-3 py-3'
														: 'suggestion-item px-3 py-3';
													// inline style for demonstration purpose
													const style = suggestion.active
														? { backgroundColor: '#eee', cursor: 'pointer' }
														: { backgroundColor: '#ffffff', cursor: 'pointer' };
													return (
														<div
															key={index}
															{...getSuggestionItemProps(suggestion, {
																className,
																style,
															})}
														>
															<span>{suggestion.description}</span>
														</div>
													);
												})}
											</div>
										</div>
									)}
								</PlacesAutocomplete>
							</div>
							<div className='flex justify-center items-center pt-5'>
								<Button onClick={calculateRate} text={"Calculate"} />
							</div>
							{pricingData && <div className='flex justify-center'>
								<div className='w-max mt-4 px-5 py-2 rounded-full border-2 border-accentYellow bg-white'>Fare: {(distance * Number(pricingData?.per_kilometer_charge)).toFixed(2)}</div>
							</div>}
						</div>
					</div>
				</div>
			</section>

			{/* Send your parcel Hassel-free!! section-4 pending*/}
			<section className='h-screen w-full relative Poppins hidden flex-col border-b-2 px-28 py-9'>
				<img src="/assets/BG/bg-shape-6.png" className='absolute left-0 bottom-[63%] z-0' alt="" />
				<div className='bg-[gradient-bg] w-full h-full'>
					<h1>Send your parcel Hassel-free!!</h1>
					<ul>
						<li>Automated Delivery- Instead of calling or emailing the carrier, customers may use the app to arrange package pickups.</li>
						<li>Contactless Delivery- Customers can request contactless delivery, which does not require signatures.</li>
					</ul>
				</div>
			</section>

			{/* Bulk Order section-5 */}
			<section className='h-auto w-full relative Poppins flex flex-col border-b-2 px-5 md:px-28 py-9 pb-12'>
				<img src="/assets/BG/bg-shape-7.png" className='absolute right-80 bottom-96 z-0' alt="" />
				<h1 className='pb-4 text-3xl md:text-5xl font-semibold'>Bulk Order</h1>
				<div className='shadow-xl md:flex hidden bg-accentYellow z-50 rounded-3xl px-6 py-12 relative'>
					<div className='w-[25%] border-r-2 flex justify-center items-center'>
						<Button text={"Give a call"} onClick={() => {
							window.open("tel:9082165116")
						}} className={" text-accentYellow bg-white"} />
					</div>
					<div className='w-[50%] flex flex-col justify-center p-5 px-14 text-white'>
						<h1 className='text-3xl font-medium'>+91 9082165116</h1>
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
						<h1 className='text-2xl font-medium'>+91 9082165116</h1>
						<p className='text-base'>Give us a call, We are just a call away!!</p>
					</div>
					<div className='flex justify-center items-center'>
						<Button onClick={() => {
							window.open("tel:9082165116")
						}} text={"Give a call"} className={"mt-3 text-accentYellow bg-white"} />
					</div>
				</div>
			</section>

			{/* We know how assist with any kind of business. Section-2 */}
			<section className='h-auto w-full relative Poppins flex flex-col border-b-2 px-5 md:px-28'>
				<img src="/assets/BG/bg-shape-3.png" className='absolute bottom-4 left-0 hidden md:block w-[80%] h-[100%] z-0' alt="" />
				<img src="/assets/BG/bg-shape-4.png" className='absolute top-16 right-16 h-[200px] aspect-square md:h-[27%] md:w-[14%] z-0' alt="" />
				<h1 className='z-50 text-3xl md:text-5xl leading-tight pt-9 font-semibold mb-3'>We know how assist with <br className='md:block hidden' /> any kind of business.</h1>

				<div className='grid grid-cols-2 md:grid-cols-4 gap-x-5 md:gap-x-20 gap-y-11 z-50 p-0 py-5 md:p-5 md:pb-11'>
					<div className='flex flex-col items-center'>
						<div className='shadow-md duration-200 cursor-pointer hover:shadow-xl bg-[#C7D4E7] rounded-xl p-[20px] w-full h-full flex justify-center items-center'>
							<img className='h-[100px] aspect-square md:h-[60%] object-cover' src="https://img.freepik.com/free-photo/laptop-with-credit-card-payment-online-shopping-bag-ecommerce-concept-blue-background-3d-illustration_56104-1788.jpg?w=900&t=st=1689922790~exp=1689923390~hmac=0446e6499261dbab5ebb347e4b93ff1e0dbfc280fbdc59a993937a1181733596" alt="" />
						</div>
						<p className='text-base md:text-lg pt-2 font-medium'>E-Commerce</p>
					</div>

					<div className='flex flex-col items-center'>
						<div className='shadow-md duration-200 cursor-pointer hover:shadow-xl bg-[#CECECE] rounded-xl p-[20px] w-full h-full flex justify-center items-center'>
							{/* <img className='h-[100px] aspect-square md:h-[60%]' src="/assets/apple.png" alt="" /> */}
							<img className='h-[100px] aspect-square md:h-[60%] object-cover' src="https://img.freepik.com/free-psd/isometric-carrots-3d-render-illustrationxa_439185-8820.jpg?w=740&t=st=1689922734~exp=1689923334~hmac=3a5ad38bfc605d2535e39805e4b9f7bd7b6fe67a24da3d83816e7585441f6fea" alt="" />
						</div>
						<p className='text-base md:text-lg pt-2 font-medium'>Vegetables</p>
					</div>

					<div className='flex flex-col items-center'>
						<div className='shadow-md duration-200 cursor-pointer hover:shadow-xl bg-[#8ED0FF] rounded-xl p-[20px] w-full h-full flex justify-center items-center'>
							{/* <img className='h-[100px] aspect-square md:h-[60%]' src="/assets/juice.png" alt="" /> */}
							<img className='h-[100px] aspect-square md:h-[60%] object-cover' src="https://img.freepik.com/free-psd/3d-rendering-delicious-cheese-burger_23-2149108546.jpg?w=740&t=st=1689922509~exp=1689923109~hmac=0e55cd47f640f28522b84a2317d736a04a69429b222219677cb92451dc8f8e41" alt="" />
						</div>
						<p className='text-base md:text-lg pt-2 font-medium'>Food</p>
					</div>

					<div className='flex flex-col items-center'>
						<div className='shadow-md duration-200 cursor-pointer hover:shadow-xl bg-[#69A1DC] rounded-xl p-[20px] w-full h-full flex justify-center items-center'>
							<img className='h-[100px] aspect-square md:h-[60%] object-cover' src="https://img.freepik.com/free-photo/hand-holds-medicine-capsules-icon-sign-symbol-blue-background-3d-illustration-cartoon-healthcare-medical-concept_56104-1645.jpg?w=826&t=st=1689922614~exp=1689923214~hmac=37a4d9a10b6d767cf4d16185e8f9d626092f69d8f9b4c3259f6f5f2d0de3f2f6" alt="" />
						</div>
						<p className='text-base md:text-lg pt-2 font-medium'>Medicines</p>
					</div>

				</div>
			</section>

			{/* Brands section-6 */}
			<section className='h-auto w-full relative Poppins hidden flex-col border-b-2 px-28 py-12'>
				<img src="/assets/BG/bg-shape-8.png" className='absolute right-0 top-[60%] z-0 ' alt="" />
				<div className='brands-gradient border-[#F2F3D4] border-4 rounded-3xl p-12 px-24 flex flex-col items-center z-50'>
					<h1 className='pb-4 text-3xl md:text-5xl font-semibold'>Serving the brands like</h1>
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

			{/* Become a courier section-7 */}
			<section className='h-auto w-full relative Poppins lg:flex hidden flex-col border-b-2 px-28 py-12 pt-20'>
				<img src="/assets/BG/bg-shape-10.png" className='absolute left-0 top-0 z-0 h-72' alt="" />
				<div className='shadow-xl h-[14rem] items-center gap-5 md:flex justify-around flex w-full bg-accentYellow z-50 rounded-3xl px-6 relative'>
					<div className='w-3/12 self-end'>
						<img src="/assets/section7.png" alt="" />
					</div>
					<div className='w-5/12 flex flex-col justify-center text-white'>
						<h1 className='text-4xl font-semibold pb-2'>Become a courier</h1>
						<ul className='pl-6 text-lg list-disc'>
							<li className='py-1'>Deliver with us, and we'll pay you right away!</li>
							<li className='py-1'>Register in 10 minutes with the Rider App.</li>
						</ul>
					</div>
					<div className='w-4/12 relative flex self-end mb-3 h-[16rem] flex-col items-center'>
						<div className='z-50 mb-3'>
							<img className='shadow-lg border rounded-xl h-48' src="/assets/qrcode.png" alt="" />
						</div>
						<Button text={"Register Now"} className={"text-accentYellow bg-white"} />
					</div>
				</div>
			</section>

			<section className='h-auto w-full relative Poppins lg:hidden flex flex-col border-b-2 px-5 py-8 pt-20'>
				<div className='relative bg-accentYellow p-5 w-full h-auto rounded-3xl'>
					<img src="/assets/qrcode.png" className='shadow-lg border-2 rounded-lg absolute h-32 w-32 -top-16 left-1/2 -translate-x-1/2' alt="" />
					<div className='pt-12 flex flex-col justify-center text-white'>
						<h1 className='text-center text-3xl font-semibold pb-2'>Become a courier</h1>
						<ul className='pl-6 list-disc'>
							<li className='py-1'>Deliver with us, and we'll pay you right away!</li>
							<li className='py-1'>Register in 10 minutes with the Rider App.</li>
						</ul>
					</div>
				</div>
			</section>

			{/* Contact Us section-8 */}
			<section className='h-auto w-full  relative Poppins flex flex-col border-b-2 lg:px-28 px-5 py-12'>
				<img src="/assets/BG/bg-shape-9.png" className='absolute right-0 top-[63%] z-0 ' alt="" />
				<img src="/assets/BG/bg-shape-7.png" className='lg:block hidden absolute left-[33%] top-0 z-0 ' alt="" />
				<h1 className='pb-4 text-3xl md:text-5xl font-semibold'>Contact Us</h1>
				<div className='w-full h-full flex lg:flex-row flex-col py-7 '>
					<div className='lg:w-1/2 lg:px-20 w-full px-3 flex flex-col h-full'>
						<div className='w-full'>
							<img src="/assets/section8.png" alt="" />
						</div>
						<div className='w-full'>
							<h1 className='lg:text-3xl text-xl font-medium pb-2 text-accentYellow'>REQUEST A CALLBACK</h1>
							<h2 className='lg:text-3xl text-xl font-medium pb-2'>We will contact in the shortest time.</h2>
							<h3 className='lg:text-3xl text-xl font-medium pb-2 text-gray-400' >Monday to Friday, 9am-5pm.	</h3>
						</div>
					</div>
					<div className='lg:w-1/2 w-full h-full flex flex-col justify-center lg:px-20 px-3  z-50'>
						<h1 className='lg:mt-0 mt-4 lg:text-xl text-base font-medium pb-2'>Fill in the Details below :</h1>
						<input className='my-2 outline-none border-2 rounded-lg focus:border-accentYellow px-3 py-2 text-base' type="text" name="" id="" placeholder='Name' />
						<input className='my-2 outline-none border-2 rounded-lg focus:border-accentYellow px-3 py-2 text-base' type="text" name="" id="" placeholder='Email' />
						<textarea className='my-2 lg:mb-12 mb-4 h-44 outline-none resize-none border-2 rounded-lg focus:border-accentYellow px-3 py-2' type="text" name="" id="" placeholder='Message (upto 200 words)'></textarea>
						<Button text={"Send message"} className={'z-50'} />
					</div>
				</div>
			</section>

			<Footer />
		</>
	)
}

export default Home
