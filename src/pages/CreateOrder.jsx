import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { FiCalendar } from 'react-icons/fi'
import { LuClock3 } from 'react-icons/lu'
import Input from '../components/Input'
import { IoIosArrowDown } from 'react-icons/io'
import Button from '../components/Button'

const CreateOrder = () => {
  return (
    <section className='h-auto w-screen Poppins flex flex-col bg-[#FFFFD0]'>
      <Navbar />
      <section className='h-auto w-screen flex flex-col items-center px-24'>
        <h1 className='text-3xl md:text-5xl pt-36 font-semibold mb-3 self-start'>Create an Order</h1>
        {/* first box */}
        <div className='border-accentYellow border-2 bg-white w-[80%] h-auto flex gap-8 my-4 py-8 px-10 rounded-2xl'>
          <div className='w-1/2 p-5 flex gap-3 border-accentYellow hover:bg-accentYellow duration-200 border-2 rounded-xl'>
            <div className='text-2xl'>
              <LuClock3 />
            </div>
            <div>
              <div className='text-xl font-medium leading-tight'>Deliver Now</div>
              <div className='font-medium '>from ₹44</div>
              <div className='text-sm text-gray-500'>The closest courier will be designated to pick up and deliver as soon as possible.</div>
            </div>
          </div>
          <div className='w-1/2 p-5 flex gap-3 border-accentYellow hover:bg-accentYellow duration-200 border-2 rounded-xl'>
            <div className='text-2xl'>
              <FiCalendar />
            </div>
            <div>
              <div className='text-xl font-medium leading-tight'>Schedule</div>
              <div className='font-medium '>from ₹44</div>
              <div className='text-sm text-gray-500'>The delivery boy will pick up and drop the each parcel at the mentioned time</div>
            </div>
          </div>
        </div>

        {/* second box */}
        <div className='border-accentYellow border-2 bg-white w-[80%] h-auto flex flex-col gap-6 my-4 py-8 px-10 rounded-2xl'>
          <h1 className='text-xl'>Weight of parcel</h1>
          <div className='flex justify-between'>
            <button className='outline-none rounded-xl px-7 py-2 hover:bg-accentYellow border-accentYellow border-2 hover:shadow-md duration-200 '>Up to 1 kg</button>
            <button className='outline-none rounded-xl px-7 py-2 hover:bg-accentYellow border-accentYellow border-2 hover:shadow-md duration-200 '>Up to 5 kg</button>
            <button className='outline-none rounded-xl px-7 py-2 hover:bg-accentYellow border-accentYellow border-2 hover:shadow-md duration-200 '>Up to 10 kg</button>
            <button className='outline-none rounded-xl px-7 py-2 hover:bg-accentYellow border-accentYellow border-2 hover:shadow-md duration-200 '>Up to 15 kg</button>
            <button className='outline-none rounded-xl px-7 py-2 hover:bg-accentYellow border-accentYellow border-2 hover:shadow-md duration-200 '>Up to 20 kg</button>
          </div>
        </div>

        {/* third box */}
        <div className='border-accentYellow border-2 bg-white w-[80%] h-auto flex flex-col gap-6 my-4 py-8 px-10 rounded-2xl'>
          <h1 className='text-xl'>Address 1</h1>
          <Input label={"Pickup Address"} type={"text"} placeholder={"Enter your pickup address"} id={"pickupAddress"} />
          <Input label={"Mobile Number"} type={"number"} placeholder={"Enter your 10 digit mobile number"} id={"mobileNumber"} />
          <Input label={"How to reach"} type={"text"} placeholder={"Flat Number, Floor, Building, Street Name, Landmarks"} id={"reach"} />
          <h1 className='text-xl'>Additional Info</h1>
          <div className='flex gap-10 w-full'>
            <Input label={"Contact Person"} type={"text"} placeholder={"Enter the name of contact person"} id={"contactPerson"} />
            <Input label={"Order Number"} type={"text"} placeholder={"Enter your order number"} id={"orderNumber"} />
          </div>
        </div>

        {/* fourth box */}
        <div className='border-accentYellow border-2 bg-white w-[80%] h-auto flex flex-col gap-6 my-4 py-8 px-10 rounded-2xl'>
          <h1 className='text-xl'>Address 2</h1>
          <Input label={"Drop Address"} type={"text"} placeholder={"Enter your pickup address"} id={"pickupAddress"} />
          <Input label={"Mobile Number"} type={"number"} placeholder={"Enter your 10 digit mobile number"} id={"mobileNumber"} />
          <Input label={"How to reach"} type={"text"} placeholder={"Flat Number, Floor, Building, Street Name, Landmarks"} id={"reach"} />
          <h1 className='text-xl'>Additional Info</h1>
          <div className='flex gap-10 w-full'>
            <Input label={"Contact Person"} type={"text"} placeholder={"Enter the name of contact person"} id={"contactPerson"} />
            <Input label={"Order Number"} type={"text"} placeholder={"Enter your order number"} id={"orderNumber"} />
          </div>
        </div>

        {/* fifth box */}
        <div className='bg-accentYellow w-[80%] h-auto flex flex-col gap-6 my-4 py-3 px-10 rounded-2xl'>
          <h1 className='text-lg flex items-center'><span className='text-2xl pr-2'>+</span> Add a Delivery Point</h1>
        </div>

        {/* sixth box */}
        <div className='border-accentYellow border-2 bg-white w-[80%] h-auto flex flex-col gap-6 my-4 py-8 px-10 rounded-2xl'>
          <h1 className='text-xl'>What Commodity are you Sending?</h1>
          <Input type={"text"} placeholder={"Cake, Fruits, Clothes, Documents, Flowers, vegetables,etc"} id={"commodity"} />
        </div>

        {/* seventh box */}
        <div className='border-accentYellow border-2 bg-white w-[80%] h-auto flex flex-col gap-6 my-4 py-8 px-10 rounded-2xl'>
          <h1 className='text-xl'>Insurance of Parcel</h1>
          <div className='flex w-full gap-10 items-end'>
            <Input label={"Parcel Value"} type={"text"} placeholder={"Enter the cost of the parcel"} id={"commodity"} />
            <p className='w-[70%]'>Rs- 100 Additional insurance charges applied</p>
          </div>
          <p>Secure any delicate or crucial packages so that you may recover the value in the event that they are lost or damaged during delivery. For this, we charge a fee equal to 0.85% of the amount you declare above plus GST (in addition to the shipping price). Good for up to Rs 50,000.</p>
        </div>

        {/* eight box */}
        <div className='border-accentYellow border-2 bg-white w-[80%] h-auto flex flex-col gap-6 my-4 py-8 px-10 rounded-2xl'>
          <h1 className='text-xl'>Additional Serivices</h1>

        </div>

        {/* nineth box */}
        <div className='border-accentYellow border-2 bg-white w-[80%] h-auto flex flex-col items-center gap-6 my-4 py-8 px-10 rounded-2xl'>
          <h1 className='text-xl text-left w-full'>Payment Type</h1>
          <div className='w-[60%] flex justify-between '>
            <button className='outline-none rounded-xl px-7 py-2 hover:bg-accentYellow border-accentYellow border-2 hover:shadow-md duration-200 '>Cash</button>
            <button className='outline-none rounded-xl px-7 py-2 hover:bg-accentYellow border-accentYellow border-2 hover:shadow-md duration-200 '>UPI</button>
            <button className='outline-none rounded-xl px-7 py-2 hover:bg-accentYellow border-accentYellow border-2 hover:shadow-md duration-200 '>Card</button>
          </div>
        </div>

        {/* tenth box */}
        <div className='border-accentYellow border-2 bg-white w-[80%] h-auto relative flex flex-col gap-6 my-4 py-3 px-10 rounded-2xl'>
          <h1 className='text-lg flex items-center'>Order Amount - ₹144</h1>
          <span className='absolute right-10 top-5 text-lg'><IoIosArrowDown /></span>
        </div>

        <Button text={"Confirm Order"} className={"mt-14 mb-6"} />

        <div className='border-accentYellow border-2 bg-white w-[80%] h-auto relative flex flex-col my-4 p-10 rounded-2xl'>
          <p>Clicking "Submit order" sends your request to the couriers and signifies your acceptance of the terms of the agreements as well as our terms and conditions.</p>
          <p>After submitting an order, SMS alerts can be configured.</p>
          <p className='my-3'>Simple steps to order a delivery boy are as follows:</p>
          <p>Please give us the following information: addresses, contact information for each address, preferred delivery time, and delivery weight.</p>
          <p>Click "Submit order" if you agree with our quote.</p>
          <p>Get a call from the delivery lad who will be delivering your purchase. Negotiate a price at which he will be compensated. Give him further information about your package and the method you want.</p>
          <p>If you have any questions, contact us by message or phone our operator. By selecting the 'Order' option, you will receive the Operator's phone number, save it together with the order number.</p>
          <p>Have your delivery done. Give the courier his signature directly on his smartphone's screen to confirm everything was done correctly. To assist us in selecting the very best couriers, you can evaluate a courier once the delivery is complete.</p>
          <p className='mt-3'>Many thanks, Team Instaport</p>
        </div>

        <Button text={"Scroll to top"} className={"my-4"} />

        <div className='border-y-2 border-gray-200 w-full flex flex-col py-9 mt-3 gap-4 justify-center items-center'>
          <p>We are open to feedback, Please give your valuable feedback at the Link given below</p>
          <Button text={"Give Feedback"} className={""} />
        </div>


      </section>
      <Footer />
    </section>
  )
}

export default CreateOrder