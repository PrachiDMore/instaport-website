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
    phone_number: "",
    instructions: "",
    building: "",
    floor: "",
    flatno: ""
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
    vehicle: "scooty"
  }
  const [formState, setFormState] = useState(initialFormState)
  const [priceData, setPriceData] = useState();
  const [distance, setDistance] = useState(0);
  const [payment, setPayment] = useState("cod")

  useEffect(() => {
    axios("https://insta-port-backend-api.vercel.app/price/get", {
      method: "GET"
    })
      .then((res) => {
        setPriceData(res.data.priceManipulation)
      })
  }, [])

  var responseHandler = async function (txn) {
    if (txn.status === 200) {
      axios("https://insta-port-backend-api.vercel.app/customer-transactions/create-payment", {
        method: "POST",
        data: {
          transaction: txn.txnResponse.transaction_response,
        },
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      })
        .then((res) => {
          axios("https://insta-port-backend-api.vercel.app/order/create", {
            method: "POST",
            data: { ...formState, pickup: pickup, drop: drop, amount: res.data.transaction.amount, payment_method: res.data.transaction.payment_method_type },
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
          })
            .then((res) => {
              if (res.data.error) {
                alert("Something went wrong")
              } else {
                alert(res.data.message)
              }
            })
            .catch((err) => {
              console.error(err)
            })
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }

  const handlePayment = () => {
    let ip = "";
    let amount = (priceData?.additional_per_kilometer_charge * distance).toFixed(2)
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then((data) => {
        ip = data.ip
      });
    axios("https://insta-port-backend-api.vercel.app/auth/create-order", {
      method: "POST",
      data: {
        ip: ip,
        user_agent: window.navigator.userAgent,
        amount: amount
      }
    })
      .then((res) => {

        var flow_config = {
          merchantId: "UATINSPTV2",
          bdOrderId: res.data.bdorderid,
          authToken: res.data.authorization,
          childWindow: true,
          retryCount: 0,
          prefs: {
            "payment_categories": ["card", "upi", "qr"],
          },
          themeConfig: {
            sdkPrimaryColor: "#69068a",
            sdkAccentColor: "#cf5df5",
            sdkBackgroundColor: "#f2caff",
            sdkBannerColor: "#982cbb"
          }
        };

        var config = {
          merchantLogo: "https://instaportdelivery.com/assets/logo/logo.png",
          flowConfig: flow_config,
          flowType: "payments",
          responseHandler: responseHandler,
        };

        var xmlhttp = new XMLHttpRequest();
        var jsonObj = "";
        {
          window.loadBillDeskSdk(config);
        };
      })

  }

  const calculateRate = () => {
    try {
      const google = window.google;

      const directionsService = new google.maps.DirectionsService();

      directionsService.route(
        {
          origin: { lat: pickup.latitude, lng: pickup.longitude },
          destination: { lat: drop.latitude, lng: drop.longitude },
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (response, status) => {
          if (status === 'OK') {
            const route = response.routes[0];
            if (route && route.legs && route.legs.length > 0) {
              setDistance((route.legs[0].distance.value / 1000).toFixed(2));
            }
          } else {
            alert('Directions request failed due to ' + status);
          }
        }
      );
    } catch (error) {
      alert("Something went wrong! Try reloading the page!")
    }

  }

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = () => {

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
              <div className='font-medium '>from ₹{priceData?.base_order_charges}</div>
              <div className='text-sm text-gray-500'>The closest courier will be designated to pick up and deliver as soon as possible.</div>
            </div>
          </div>
          <div onClick={() => { setFormState({ ...formState, delivery_type: "schedule" }) }} className={formState?.delivery_type === "schedule" ? 'lg:w-1/2 w-full lg:p-5 p-3 flex gap-3 border-accentYellow bg-accentYellow duration-200 border-2 rounded-xl' : 'lg:w-1/2 w-full lg:p-5 p-3 flex gap-3 border-accentYellow duration-200 border-2 rounded-xl'}>
            <div className='text-2xl'>
              <FiCalendar />
            </div>
            <div>
              <div className='text-xl font-medium leading-tight'>Schedule</div>
              <div className='font-medium '>from ₹{priceData?.base_order_charges}</div>
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
        <div className='border-accentYellow border-2 bg-white lg:w-[80%] w-full h-auto flex flex-col lg:gap-3 gap-3 my-4 lg:py-8 py-4 lg:px-10 px-4 rounded-2xl'>
          <h1 className='text-xl mb-1 font-bold'>Address 1</h1>
          <div className='w-full flex flex-col items-start'>
            <label htmlFor={"i"} className='pb-1 lg:text-base text-sm' >{"Pickup Address"}</label>
            <PlacesAutocomplete
              searchOptions={{
                componentRestrictions: {
                  country: ['in']
                }
              }}
              value={pickup.text}
              onChange={(e) => {
                setPickup({ ...pickup, text: e })
              }}
              onSelect={(e) => {
                setPickup({ ...pickup, text: e })
                geocodeByAddress(e)
                  .then(results => getLatLng(results[0]))
                  .then(latLng => {
                    setPickup({ ...pickup, text: e, latitude: latLng.lat, longitude: latLng.lng })
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
          <div className='grid grid-cols-3 gap-x-4'>
            <Input onChange={(e) => { setPickup({ ...pickup, building: e.target.value }) }} value={pickup.building} label={"Building"} type={"text"} placeholder={"Enter your building name"} id={"building"} />
            <Input onChange={(e) => { setPickup({ ...pickup, floor: e.target.value }) }} value={pickup.floor} label={"Floor"} type={"text"} placeholder={"Enter your floor no."} id={"floor"} />
            <Input onChange={(e) => { setPickup({ ...pickup, flatno: e.target.value }) }} value={pickup.flatno} label={"Flat no."} type={"text"} placeholder={"Enter your flat no."} id={"flatno"} />
          </div>
          <Input onChange={(e) => { setPickup({ ...pickup, phone_number: e.target.value }) }} value={pickup.phone_number} label={"Mobile Number"} type={"text"} placeholder={"Enter your 10 digit mobile number"} id={"phone_number"} />
          <Input onChange={(e) => { setPickup({ ...pickup, instructions: e.target.value }) }} value={pickup.instructions} label={"Instructions"} type={"text"} placeholder={"Instructions"} id={"instructions"} />
        </div>

        {/* fourth box */}
        <div className='border-accentYellow border-2 bg-white lg:w-[80%] w-full h-auto flex flex-col lg:gap-3 gap-3 my-4 lg:py-8 py-4 lg:px-10 px-4 rounded-2xl'>
          <h1 className='text-xl mb-1 font-bold'>Address 2</h1>
          <div className='w-full flex flex-col items-start'>
            <label htmlFor={"i"} className='pb-1 text-sm lg:text-base' >{"Drop Address"}</label>
            <PlacesAutocomplete
              searchOptions={{
                componentRestrictions: {
                  country: ['in']
                }
              }}
              value={drop.text}
              onChange={(e) => {
                setDrop({ ...drop, text: e })
              }}
              onSelect={(e) => {
                setDrop({ ...drop, text: e })
                geocodeByAddress(e)
                  .then(results => getLatLng(results[0]))
                  .then(latLng => {
                    setDrop({ ...drop, text: e, latitude: latLng.lat, longitude: latLng.lng })
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
          <div className='grid grid-cols-3 gap-x-4'>
            <Input onChange={(e) => { setDrop({ ...drop, building: e.target.value }) }} value={drop.building} label={"Building"} type={"text"} placeholder={"Enter your building name"} id={"building"} />
            <Input onChange={(e) => { setDrop({ ...drop, floor: e.target.value }) }} value={drop.floor} label={"Floor"} type={"text"} placeholder={"Enter your floor no."} id={"floor"} />
            <Input onChange={(e) => { setDrop({ ...drop, flatno: e.target.value }) }} value={drop.flatno} label={"Flat no."} type={"text"} placeholder={"Enter your flat no."} id={"flatno"} />
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
          <div className='flex flex-col w-full gap-3 items-end'>
            <Input onChange={handleChange} value={formState.parcel_value} label={"Parcel Value"} type={"number"} placeholder={"Enter the cost of the parcel"} id={"parcel_value"} />
            <p className='w-full'>Rs - 100 Additional insurance charges applied</p>
          </div>
          <Input onChange={handleChange} value={formState.phone_number} label={"Phone Number"} type={"text"} placeholder={"Enter phone number"} id={"phone_number"} />
          <p className='text-justify'>Secure any delicate or crucial packages so that you may recover the value in the event that they are lost or damaged during delivery. For this, we charge a fee equal to 0.85% of the amount you declare above plus GST (in addition to the shipping price). Good for up to Rs 50,000.</p>
        </div>

        {/* eight box */}
        <div className='border-accentYellow border-2 bg-white lg:w-[80%] w-full h-auto hidden flex-col gap-6 my-4 lg:py-8 py-4 lg:px-10 px-4 rounded-2xl'>
          <h1 className='text-xl'>Additional Serivices</h1>
        </div>

        <div className='border-accentYellow border-2 bg-white lg:w-[80%] w-full h-auto flex flex-col gap-6 my-4 lg:py-8 py-4 lg:px-10 px-4 rounded-2xl'>
          <h1 className='text-xl font-bold'>Additional Services</h1>

          <h3 className='mt-3 font-semibold'>Select Shipping</h3>
          <div className='grid lg:grid-cols-2 grid-cols-1 gap-6'>
            <div onClick={() => { setFormState({ ...formState, vehicle: "scooty" }) }} className={formState.vehicle === "scooty" ? 'cursor-pointer bg-white p-4 border-2 border-accentYellow rounded-xl flex gap-3 items-center' : 'cursor-pointer bg-white p-4 border-2 rounded-xl flex gap-3 items-center'}>
              <div className='h-16 w-16 bg-accentYellow/20 flex items-center justify-center rounded-xl'>
                <img src="/assets/icons/scooty.svg" className='h-7' alt="" />
              </div>
              <div>
                <h3 className='font-semibold'>Scooter</h3>
                <p>For high capacity delivery</p>
              </div>
            </div>
            <div onClick={() => { setFormState({ ...formState, vehicle: "bike" }) }} className={formState.vehicle === "bike" ? 'cursor-pointer bg-white p-4 border-2 border-accentYellow rounded-xl flex gap-3 items-center' : 'cursor-pointer bg-white p-4 border-2 rounded-xl flex gap-3 items-center'}>
              <div className='h-16 w-16 bg-accentYellow/20 flex items-center justify-center rounded-xl'>
                <img src="/assets/icons/bike.svg" className='h-8' alt="" />
              </div>
              <div>
                <h3 className='font-semibold'>Bike</h3>
                <p>For low capacity delivery</p>
              </div>
            </div>
          </div>
        </div>

        {/* nineth box */}
        <div className='border-accentYellow border-2 bg-white lg:w-[80%] w-full h-auto flex flex-col gap-6 my-4 lg:py-8 py-4 lg:px-10 px-4 rounded-2xl'>
          <h1 className='text-xl text-left w-full'>Payment Type</h1>
          <div className='w-[60%] flex justify-start gap-6' >
            {/* <button type='button' onClick={() => { setPayment("cod") }} className={payment === "cod" ? 'outline-none rounded-xl px-7 py-2 bg-accentYellow border-accentYellow border-2 hover:shadow-md duration-200 ' : 'outline-none rounded-xl px-7 py-2 border-accentYellow border-2 hover:shadow-md duration-200 '}>Cash</button> */}
            <button type='button' onClick={() => { setPayment("online") }} className={payment === "online" ? 'outline-none rounded-xl px-7 py-2 bg-accentYellow border-accentYellow border-2 hover:shadow-md duration-200 ' : 'outline-none rounded-xl px-7 py-2 border-accentYellow border-2 hover:shadow-md duration-200 '}>Online</button>
          </div>
        </div>

        {/* tenth box */}
        <div className='border-accentYellow border-2 bg-white lg:w-[80%] w-full h-auto flex flex-col gap-6 my-4 lg:py-8 py-4 lg:px-10 px-4 rounded-2xl'>
          <Button onClick={calculateRate} type="button" text={"Calculate Fare"} className={"py-3"} />
          <h1 className='text-lg flex items-center'>Order Amount - ₹{(distance * priceData?.additional_per_kilometer_charge).toFixed(2)}</h1>
          {/* <span className='absolute right-10 top-5 text-lg'><IoIosArrowDown /></span> */}
        </div>

        <Button onClick={handlePayment} type="button" text={"Confirm Order"} className={"mt-14 mb-6 py-3"} />

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