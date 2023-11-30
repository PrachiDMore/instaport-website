import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { FiCalendar } from 'react-icons/fi'
import { LuClock3 } from 'react-icons/lu'
import Input from '../components/Input'
import { IoIosArrowDown } from 'react-icons/io'
import Button from '../components/Button'
import { useEffect } from 'react'
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';
import PlacesAutocomplete from 'react-places-autocomplete';
import { useRef } from 'react'
import axios from 'axios'


const CreateOrder = () => {
  const addressInitialState = {
    text: "",
    latitude: 0,
    longitude: 0,
  }
  const [pickupAddress, setPickupAddress] = useState(addressInitialState);
  const [dropAddress, setDropAddress] = useState(addressInitialState);
  const addressInfo = {
    phone_number: "",
    instructions: ""
  }
  const [pickup, setPickup] = useState(addressInfo)
  const [drop, setDrop] = useState(addressInfo)
  const initialFormState = {
    delivery_type: "now",
    parcel_weight: "upto 1kg",
    phone_number: "",
    payment_method: "cod",
    package: "",
    parcel_value: 0,
  }
  const [formState, setFormState] = useState(initialFormState)

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = () => {
    axios("https://instaport-api.vercel.app/order/create", {
      method: "POST",
      data: { ...formState, pickup: { address: pickupAddress, ...pickup }, drop: { address: dropAddress, ...drop }, payment_address: { address: pickupAddress, ...pickup } },
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then((res) => {
        if (!res.data.error) {
          alert(res.data.message)
        } else {
          alert(res.data.message)
        }
      })
      .catch((err) => {
        alert(err.message)
      })
  }
  return (
    <section className='h-auto w-screen Poppins flex flex-col bg-[#fafae0]'>
      <Navbar />
      <div className='h-auto w-screen flex flex-col items-center lg:px-24 px-5 lg:text-left text-center'>
        <div className='w-full flex lg:justify-start justify-center'>
          <h1 className='text-3xl md:text-5xl pt-36 font-semibold mb-3 self-start lg:text-left text-center'>Create an Order</h1>
        </div>
        {/* first box */}
        <div className='border-accentYellow border-2 bg-white lg:w-[80%] w-full h-auto flex lg:flex-row flex-col gap-8 my-4 lg:py-8 py-4 lg:px-10 px-4 rounded-2xl'>
          <div onClick={() => { setFormState({ ...formState, delivery_type: "now" }) }} className={formState?.delivery_type === "now" ? 'lg:w-1/2 w-full lg:p-5 p-3 flex gap-3 border-accentYellow bg-accentYellow duration-200 border-2 rounded-xl' : 'lg:w-1/2 w-full lg:p-5 p-3 flex gap-3 border-accentYellow duration-200 border-2 rounded-xl'}>
            <div className='text-2xl'>
              <LuClock3 />
            </div>
            <div>
              <div className='text-xl font-medium leading-tight'>Deliver Now</div>
              <div className='font-medium '>from ₹44</div>
              <div className='text-sm text-gray-500'>The closest courier will be designated to pick up and deliver as soon as possible.</div>
            </div>
          </div>
          <div onClick={() => { setFormState({ ...formState, delivery_type: "schedule" }) }} className={formState?.delivery_type === "schedule" ? 'lg:w-1/2 w-full lg:p-5 p-3 flex gap-3 border-accentYellow bg-accentYellow duration-200 border-2 rounded-xl' : 'lg:w-1/2 w-full lg:p-5 p-3 flex gap-3 border-accentYellow duration-200 border-2 rounded-xl'}>
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
        <div className='border-accentYellow border-2 bg-white lg:w-[80%] w-full h-auto flex flex-col gap-6 my-4 lg:py-8 py-4 lg:px-10 px-4 rounded-2xl'>
          <h1 className='text-xl'>Weight of parcel</h1>
          <div className='flex justify-between gap-3 lg:flex-nowrap flex-wrap'>
            <button onClick={() => { setFormState({ ...formState, parcel_weight: "upto 1kg" }) }} className={formState?.parcel_weight !== "upto 1kg" ? 'w-[135px] outline-none rounded-xl px-5 py-2 border-accentYellow border-2 hover:shadow-md duration-200 ' : "bg-accentYellow w-[135px] outline-none rounded-xl px-5 py-2 border-accentYellow border-2 hover:shadow-md duration-200 "}>Up to 1 kg</button>
            <button onClick={() => { setFormState({ ...formState, parcel_weight: "upto 5kg" }) }} className={formState?.parcel_weight !== "upto 5kg" ? 'w-[135px] outline-none rounded-xl px-5 py-2 border-accentYellow border-2 hover:shadow-md duration-200 ' : "bg-accentYellow w-[135px] outline-none rounded-xl px-5 py-2 border-accentYellow border-2 hover:shadow-md duration-200 "}>Up to 5 kg</button>
            <button onClick={() => { setFormState({ ...formState, parcel_weight: "upto 10kg" }) }} className={formState?.parcel_weight !== "upto 10kg" ? 'w-[135px] outline-none rounded-xl px-5 py-2 border-accentYellow border-2 hover:shadow-md duration-200 ' : "bg-accentYellow w-[135px] outline-none rounded-xl px-5 py-2 border-accentYellow border-2 hover:shadow-md duration-200 "}>Up to 10 kg</button>
            <button onClick={() => { setFormState({ ...formState, parcel_weight: "upto 15kg" }) }} className={formState?.parcel_weight !== "upto 15kg" ? 'w-[135px] outline-none rounded-xl px-5 py-2 border-accentYellow border-2 hover:shadow-md duration-200 ' : "bg-accentYellow w-[135px] outline-none rounded-xl px-5 py-2 border-accentYellow border-2 hover:shadow-md duration-200 "}>Up to 15 kg</button>
            <button onClick={() => { setFormState({ ...formState, parcel_weight: "upto 20kg" }) }} className={formState?.parcel_weight !== "upto 20kg" ? 'w-[135px] outline-none rounded-xl px-5 py-2 border-accentYellow border-2 hover:shadow-md duration-200 ' : "bg-accentYellow w-[135px] outline-none rounded-xl px-5 py-2 border-accentYellow border-2 hover:shadow-md duration-200 "}>Up to 20 kg</button>
          </div>
        </div>

        {/* third box */}
        <div className='border-accentYellow border-2 bg-white lg:w-[80%] w-full h-auto flex flex-col lg:gap-6 gap-3 my-4 lg:py-8 py-4 lg:px-10 px-4 rounded-2xl'>
          <h1 className='text-xl'>Address 1</h1>
          <div className='w-full flex flex-col items-start'>
            <label htmlFor={"i"} className='pb-1 lg:text-base text-sm' >{"Pickup Address"}</label>
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
                    setPickupAddress({ ...pickupAddress, text: e, latitude: latLng.lat, longitude: latLng.lng })
                  })
                  .catch(error => console.error('Error', error));
              }}
              debounce={200}
              shouldFetchSuggestions={true}
            >
              {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div className='relative w-full'>
                  <input
                    {...getInputProps({
                      placeholder: 'Enter your pickup address',
                      className: 'w-full location-search-input outline-none rounded-xl px-7 py-3 border-accentYellow border-2 w-full',
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
          <Input onChange={(e) => { setPickup({ ...pickup, phone_number: e.target.value }) }} value={pickup.phone_number} label={"Mobile Number"} type={"text"} placeholder={"Enter your 10 digit mobile number"} id={"phone_number"} />
          <Input onChange={(e) => { setPickup({ ...pickup, instructions: e.target.value }) }} value={pickup.instructions} label={"Instructions"} type={"text"} placeholder={"Instructions"} id={"instructions"} />
        </div>

        {/* fourth box */}
        <div className='border-accentYellow border-2 bg-white lg:w-[80%] w-full h-auto flex flex-col lg:gap-6 gap-3 my-4 lg:py-8 py-4 lg:px-10 px-4 rounded-2xl'>
          <h1 className='text-xl'>Address 2</h1>
          <div className='w-full flex flex-col items-start'>
            <label htmlFor={"i"} className='pb-1 text-sm lg:text-base' >{"Drop Address"}</label>
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
                <div className='relative w-full '>
                  <input
                    {...getInputProps({
                      placeholder: 'Enter your drop address',
                      className: 'w-full location-search-input outline-none rounded-xl px-7 py-3 border-accentYellow border-2 w-full',
                    })}
                  />
                  <div className="absolute autocomplete-dropdown-container w-full shadow-lg">
                    {loading && <div className='w-full px-3 py-3 bg-white'>Loading...</div>}
                    {suggestions.map(suggestion => {
                      const className = suggestion.active
                        ? 'suggestion-item--active px-3 py-3'
                        : 'suggestion-item px-3 py-3';
                      // inline style for demonstration purpose
                      const style = suggestion.active
                        ? { backgroundColor: '#eee', cursor: 'pointer' }
                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                      return (
                        <div
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
          <Input onChange={(e) => { setDrop({ ...drop, phone_number: e.target.value }) }} value={drop.phone_number} label={"Mobile Number"} type={"text"} placeholder={"Enter your 10 digit mobile number"} id={"phone_number"} />
          <Input onChange={(e) => { setDrop({ ...drop, instructions: e.target.value }) }} value={drop.instructions} label={"Instructions"} type={"text"} placeholder={"Instructions"} id={"instructions"} />
        </div>

        {/* fifth box */}
        <div className='bg-accentYellow lg:w-[80%] w-full h-auto flex flex-col gap-6 my-4 py-3 px-10 rounded-2xl'>
          <h1 className='text-lg flex items-center'><span className='text-2xl pr-2'>+</span> Add a Delivery Point</h1>
        </div>

        {/* sixth box */}
        <div className='border-accentYellow border-2 bg-white w-full lg:w-[80%] h-auto flex flex-col gap-6 my-4 lg:py-8 py-4 lg:px-10 px-4 rounded-2xl'>
          <h1 className='text-xl'>What Commodity are you Sending?</h1>
          <Input onChange={handleChange} value={formState.package} type={"text"} placeholder={"Cake, Fruits, Clothes, Documents, Flowers, vegetables,etc"} id={"package"} />
        </div>

        {/* seventh box */}
        <div className='border-accentYellow border-2 bg-white lg:w-[80%] w-full h-auto flex flex-col gap-6 my-4 lg:py-8 py-4 lg:px-10 px-4 rounded-2xl'>
          <h1 className='text-xl'>Insurance of Parcel</h1>
          <div className='flex lg:flex-row flex-col w-full lg:gap-10 gap-3 items-end'>
            <Input onChange={handleChange} value={formState.parcel_value} label={"Parcel Value"} type={"number"} placeholder={"Enter the cost of the parcel"} id={"parcel_value"} />
            <p className='lg:w-[70%] w-full'>Rs- 100 Additional insurance charges applied</p>
          </div>
          <Input onChange={handleChange} value={formState.phone_number} label={"Phone Number"} type={"text"} placeholder={"Enter phone number"} id={"phone_number"} />
          <p className='lg:text-center text-left'>Secure any delicate or crucial packages so that you may recover the value in the event that they are lost or damaged during delivery. For this, we charge a fee equal to 0.85% of the amount you declare above plus GST (in addition to the shipping price). Good for up to Rs 50,000.</p>
        </div>

        {/* eight box */}
        <div className='border-accentYellow border-2 bg-white lg:w-[80%] w-full h-auto flex flex-col gap-6 my-4 lg:py-8 py-4 lg:px-10 px-4 rounded-2xl'>
          <h1 className='text-xl'>Additional Serivices</h1>

        </div>

        {/* nineth box */}
        <div className='border-accentYellow border-2 bg-white lg:w-[80%] w-full h-auto flex flex-col gap-6 my-4 lg:py-8 py-4 lg:px-10 px-4 rounded-2xl'>
          <h1 className='text-xl text-left w-full'>Payment Type</h1>
          <div className='w-[60%] flex justify-between '>
            <button type='button' onClick={() => { setFormState({ ...formState, payment_method: "cod" }) }} className={formState?.payment_method === "cod" ? 'outline-none rounded-xl px-7 py-2 bg-accentYellow border-accentYellow border-2 hover:shadow-md duration-200 ' : 'outline-none rounded-xl px-7 py-2 border-accentYellow border-2 hover:shadow-md duration-200 '}>Cash</button>
            <button type='button' disabled onClick={() => { setFormState({ ...formState, payment_method: "cod" }) }} className={formState?.payment_method === "upi" ? 'outline-none rounded-xl px-7 py-2 bg-accentYellow border-accentYellow border-2 hover:shadow-md duration-200 ' : 'outline-none rounded-xl px-7 py-2 border-accentYellow border-2 hover:shadow-md duration-200 '}>UPI</button>
            <button type='button' disabled onClick={() => { setFormState({ ...formState, payment_method: "cod" }) }} className={formState?.payment_method === "card" ? 'outline-none rounded-xl px-7 py-2 bg-accentYellow border-accentYellow border-2 hover:shadow-md duration-200 ' : 'outline-none rounded-xl px-7 py-2 border-accentYellow border-2 hover:shadow-md duration-200 '}>Card</button>
          </div>
        </div>

        {/* tenth box */}
        <div className='border-accentYellow border-2 bg-white lg:w-[80%] w-full h-auto flex flex-col gap-6 my-4 lg:py-8 py-4 lg:px-10 px-4 rounded-2xl'>
          <h1 className='text-lg flex items-center'>Order Amount - ₹144</h1>
          {/* <span className='absolute right-10 top-5 text-lg'><IoIosArrowDown /></span> */}
        </div>

        <Button onClick={handleSubmit} type="button" text={"Confirm Order"} className={"mt-14 mb-6 py-3"} />

        <div className='border-accentYellow border-2 bg-white lg:w-[80%] w-full h-auto flex flex-col lg:text-center text-left gap-6 my-4 lg:py-8 py-4 lg:px-10 px-4 rounded-2xl'>
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

        <Button type="button" text={"Scroll to top"} className={"my-4 py-3"} />

        <div className='border-y-2 border-gray-200 w-full flex flex-col py-9 mt-3 gap-4 justify-center items-center'>
          <p>We are open to feedback, Please give your valuable feedback at the Link given below</p>
          <Button text={"Give Feedback"} className={"py-3"} />
        </div>


      </div>
      <Footer />
    </section>
  )
}

export default CreateOrder