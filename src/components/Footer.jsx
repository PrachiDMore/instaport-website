import React from 'react'

const Footer = () => {
  return (
    <section className='h-auto w-screen Poppins flex flex-col border-y-2 px-28 py-12'>
      <div>
        <img src="/assets/logo/logo.png" alt="" />
      </div>
      <div className='w-full'>
        <div className='w-1/4'>
          <ul>
            <li>Mumbai</li>
            <li>Ahemadabad</li>
            <li>Hyderabad</li>
            <li>Delhi/NCR</li>
            <li>Bengaluru</li>
            <li>Pune</li>
          </ul>
        </div>
        <div className='w-1/4'>
          <ul>
            <li>Become a courier</li>
            <li>Privacy Policy</li>
            <li>Disclaimers & Dispute Resolution</li>
            <li>Community Guidelines</li>
          </ul>
        </div>
        <div className='w-1/4'>
          <ul>
            <li>For Businesses</li>
            <li>FAQs</li>
            <li>Pricing</li>
            <li>Terms and conditions</li>
          </ul>
        </div>
        <div className='w-1/4'></div>
      </div>
    </section>
  )
}

export default Footer
