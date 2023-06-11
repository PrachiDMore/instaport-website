import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {FiCalendar} from 'react-icons/fi'
import {LuClock3} from 'react-icons/lu'

const CreateOrder = () => {
  return (
    <section className='h-auto w-screen Poppins flex flex-col bg-[#FFFFD0]'>
      <Navbar />
      <section className='h-auto w-screen flex flex-col items-center px-24'>
        <h1 className='text-3xl md:text-5xl pt-36 font-semibold mb-3 self-start'>Create an Order</h1>
        <div className='bg-white w-[80%] h-auto flex gap-8 my-4 py-8 px-10 rounded-2xl'>
          <div className='w-1/2 p-5 flex gap-3 border-accentYellow hover:bg-accentYellow duration-200 border-2 rounded-xl'>
            <div className='text-2xl'>
              <LuClock3/>
            </div>
            <div>
              <div className='text-xl font-medium leading-tight'>Deliver Now</div>
              <div className='font-medium '>from ₹44</div>
              <div className='text-sm text-gray-500'>The closest courier will be designated to pick up and deliver as soon as possible.</div>
            </div>
          </div>
          <div className='w-1/2 p-5 flex gap-3 border-accentYellow hover:bg-accentYellow duration-200 border-2 rounded-xl'>
            <div className='text-2xl'>
              <FiCalendar/>
            </div>
            <div>
              <div className='text-xl font-medium leading-tight'>Schedule</div>
              <div className='font-medium '>from ₹44</div>
              <div className='text-sm text-gray-500'>The delivery boy will pick up and drop the each parcel at the mentioned time</div>
            </div>
          </div>
        </div>
        <div className='bg-white w-[80%] h-auto flex gap-8 mt-4 py-8 px-10 rounded-2xl'>
          <h1>Weight of parcel</h1>
        </div>
      </section>
      <Footer />
    </section>
  )
}

export default CreateOrder