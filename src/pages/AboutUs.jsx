import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export const AboutUs = () => {
  return (
    <section className='px-5 h-auto w-screen Poppins flex flex-col items-center bg-[#fafae0]'>
      <Navbar />
      <div className='pt-[120px]'>
        <section className='lg:w-[80%] w-full lg:p-7 px-5 py-4 bg-white rounded-xl border-2 border-accentYellow'>
          <h1 className='lg:text-2xl text-xl font-bold mb-4 text-center'>ABOUT US</h1>
          <p className='pb-2'>You can always rely on Instaport When you need to make a delivery, for something big or small or even lots of goods all in one go, Instaport Delivery is here for you.</p>
          <p className='pb-2'>It&#39;s fast, reliable and available at any time of the day. Only the most trustworthy and professional drivers can meet Uncle&#39;s standards! That&#39;s why it is known across town as the go-to Instaport to get the job done.</p>
          <p className='pb-2'>With a powerful mobile and web app, customers of Instaport Delivery can access a fleet of trusted drivers and couriers. We&#39;re fast becoming the on-demand delivery partner of choice for businesses and everyday users across India.</p>
        </section>
      </div>
      <Footer />
    </section>
  )
}
