import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const AboutUs = () => {
  return (
    <section className='h-screen px-5 w-screen Poppins flex flex-col items-center bg-[#fafae0]'>
      <Navbar />
      <div className='w-full pt-[120px] h-full'>
        <section className='mx-auto lg:w-[80%] w-full lg:p-7 px-5 py-4 bg-white rounded-xl border-2 border-accentYellow'>
          <h1 className='lg:text-2xl text-xl font-bold mb-4 text-center'>ABOUT US</h1>
          <p className='pb-2'>Instaport provides value to the customers, and ready to provide best service with same day delivery. it is the leading platform, for B2B and B2C and easy to access and can work as per costumer convenience.</p>
          <p className='pb-2'>We have just begun our is to provide world's best delivery service from end-to-end logistics platform and company motto is to provide the premium service to the customer.</p>
          <p className='pb-2'>Instaport do have quality rated and well profiled delivery executives with good relation and will work as a helping hand for the customers.</p>
        </section>
      </div>
      <Footer />
    </section>
  )
}

export default AboutUs