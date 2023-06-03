import React from 'react'

const Footer = () => {
  return (
    <section className='h-auto w-screen Poppins flex flex-col px-28 pt-12 pb-3'>
      <section className='mb-4'>
        <div>
          <img src="/assets/logo/logo.png" alt="" />
        </div>
        <div className='w-full h-full flex pt-7'>
          <div className='w-1/4 h-full flex flex-col items-center'>
            <ul>
              <li className='h-full pb-2 font-medium'>Mumbai</li>
              <li className='h-full py-2 font-medium'>Ahemadabad</li>
              <li className='h-full py-2 font-medium'>Hyderabad</li>
              <li className='h-full py-2 font-medium'>Delhi/NCR</li>
              <li className='h-full py-2 font-medium'>Bengaluru</li>
              <li className='h-full pt-2 font-medium'>Pune</li>
            </ul>
          </div>
          <div className='w-1/4 h-full flex flex-col items-center'>
            <ul>
              <li className='h-full pb-5 text-gray-400 font-medium'>Become a courier</li>
              <li className='h-full py-5 text-gray-400 font-medium'>Privacy Policy</li>
              <li className='h-full py-5 text-gray-400 font-medium'>Disclaimers & Dispute Resolution</li>
              <li className='h-full pt-5 text-gray-400 font-medium'>Community Guidelines</li>
            </ul>
          </div>
          <div className='w-1/4 h-full flex flex-col items-center'>
            <ul>
              <li className='h-full pb-5 text-gray-400 font-medium'>For Businesses</li>
              <li className='h-full py-5 text-gray-400 font-medium'>FAQs</li>
              <li className='h-full py-5 text-gray-400 font-medium'>Pricing</li>
              <li className='h-full pt-5 text-gray-400 font-medium'>Terms and conditions</li>
            </ul>
          </div>
          <div className='w-1/4 h-full flex flex-col items-center'>
            <ul>
              <li className='pb-4 '><img src="/assets/footer/playstore.png" alt="" /></li>
              <li className='pt-4 '><img src="/assets/footer/appstore.png" alt="" /></li>
            </ul>
          </div>
        </div>
      </section>
      <div className='w-full py-4 border-t-2 flex justify-center items-center text-gray-400'>&#169; 2020-2023 Instaport. All rights reserved.</div>
    </section>
  )
}

export default Footer
