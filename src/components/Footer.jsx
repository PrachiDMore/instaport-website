import React from 'react'
import { Link } from 'react-router-dom'

const Footer = ({ className }) => {
  return (
    <section className=''>
      <img src="/assets/BG/bg-shape-10.png" className='absolute z-0 h-[40%] w-[15%]' alt="" />
      <section className={'h-auto w-screen Poppins flex flex-col lg:px-28 px-5 pt-12 ' + className}>
        <section className='mb-4 flex lg:flex-row lg:gap-x-10 flex-col'>
          <div className='w-full lg:w-1/3'>
            <img src="/assets/logo/logo.png" alt="" />
            <p className='mt-3'>You can always rely on Instaport When you need to make a delivery, for something big or small or even lots of goods all in one go, Instaport Delivery is here for you.</p>
          </div>
          <div className='text-sm lg:w-2/3 w-full h-full lg:flex grid grid-cols-2 justify-start pt-7'>
            {/* <div className='h-full hidden flex-col items-center'>
              <ul className='flex flex-col h-max'>
                <li className='h-full pb-2 font-medium'>Mumbai</li>
                <li className='h-full py-2 font-medium'>Ahemadabad</li>
                <li className='h-full py-2 font-medium'>Hyderabad</li>
                <li className='h-full py-2 font-medium'>Delhi/NCR</li>
                <li className='h-full py-2 font-medium'>Bengaluru</li>
                <li className='h-full pt-2 font-medium'>Pune</li>
              </ul>
            </div> */}
            <div className=' lg:w-1/2 w-full h-full flex flex-col items-center'>
              <ul className='flex flex-col h-max'>
                <li className='h-full lg:pb-5 pb-2 text-gray-400 font-medium'>Become a courier</li>
                <li className='h-full lg:py-5 py-2 text-gray-400 font-medium'>Privacy Policy</li>
                <li className='h-full lg:pt-5 pt-2 text-gray-400 font-medium'>Refund Policy</li>
                {/* <li className='h-full lg:pt-5 pt-2 text-gray-400 font-medium'>Community Guidelines</li> */}
              </ul>
            </div>
            <div className=' lg:w-1/2 w-full h-full flex flex-col items-center'>
              <ul className='flex flex-col h-max'>
                {/* <li className='h-full lg:pb-5 pb-2 text-gray-400 font-medium'>For Businesses</li> */}
                <li className='h-full lg:pb-5 pb-2 text-gray-400 font-medium'>FAQs</li>
                <li className='h-full lg:py-5 py-2 text-gray-400 font-medium'>Pricing</li>
                <Link to='/terms-and-conditions' className='h-full lg:pt-5 pt-2 text-gray-400 font-medium'>Terms and conditions</Link>
              </ul>
            </div>
            <div className='lg:w-1/4 w-full h-full flex flex-col items-center'>
              <ul className='hidden'>
                <li className='pb-4 '><img src="/assets/footer/playstore.png" alt="" /></li>
                <li className='pt-4 '><img src="/assets/footer/appstore.png" alt="" /></li>
              </ul>
            </div>
          </div>
        </section>
        <div className='lg:text-base text-sm w-full py-4 border-t-2 flex justify-center items-center text-gray-400'>&#169; 2023 Instaport Delivery. All rights reserved.</div>
      </section>
    </section>
  )
}

export default Footer
