import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { FiCalendar, FiTrash, FiTrash2 } from 'react-icons/fi'
import { LuClock3 } from 'react-icons/lu'
import Input from '../components/Input'
import { IoIosArrowDown, IoIosClose } from 'react-icons/io'
import Button from '../components/Button'
import { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';
import PlacesAutocomplete from 'react-places-autocomplete';
import { useRef } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { ref, set } from "firebase/database";
import { db } from "../config";

const CreateOrder = () => {
  const [paymentAddress, setPaymentAddress] = useState();
  const weight = ['0-1 kg', '1-5 kg', '5-10 kg', '10-15 kg', '15-20 kg'];
  const addressInitialState = {
    'text': '',
    'latitude': 0.0,
    'longitude': 0.0,
    'building_and_flat': "",
    'floor_and_wing': "",
    'key': '',
    'instructions': "",
    'phone_number': "",
    'address': "",
    'name': "",
    'date': "",
    'time': "",
  }

  function formatPhoneNumber(input) {
    const numericInput = input.replace(/\D/g, '');

    let formattedNumber = "+91 ";

    if (numericInput.length > 7) {
      formattedNumber += numericInput.slice(2, 7) + " " + numericInput.slice(7, 12);
    } else if (numericInput.length > 2) {
      formattedNumber += numericInput.slice(2, 7);
    }
    return formattedNumber.trim();
  }

  const [pickup, setPickup] = useState(addressInitialState)
  const [drop, setDrop] = useState(addressInitialState)
  const [show, setShow] = useState(false);
  const initialFormState = {
    delivery_type: "now",
    parcel_weight: weight[0],
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
  const [droplocations, setDroplocations] = useState([]);
  const [amount, setAmount] = useState(0.0);
  const [showNote, setShowNote] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token") == "" || localStorage.getItem("token") == undefined || localStorage.getItem("token") == null) {
      alert("Please Login to your account!");
    }
    axios("https://instaport-backend-main.vercel.app/price/get", {
      method: "GET"
    })
      .then((res) => {
        setPriceData(res.data.priceManipulation)
      })
  }, [])

  var responseHandler = async function (txn) {
    if (txn.status === 200) {
      axios("https://instaport-backend-main.vercel.app/customer-transactions/create-payment", {
        method: "POST",
        data: {
          transaction: txn.txnResponse.transaction_response,
        },
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      })
        .then((res) => {
          axios("https://instaport-backend-main.vercel.app/order/create", {
            method: "POST",
            data: { ...formState, pickup: pickup, drop: drop, amount: res.data.transaction.amount, payment_method: res.data.transaction.payment_method_type, status: "new", droplocations: droplocations, commission: priceData?.instaport_commission, payment_address: paymentAddress },
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
          })
            .then((res) => {
              if (res.data.error) {
                console.log(res.data)
              } else {
                set(ref(db, 'orders/' + res.data.order._id), res.data.order);
                alert(res.data.message)
                setShow(false)
                setShowNote(true)
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
    fetchDistanceAndCost();
    if (payment === "cod") {
      axios("https://instaport-backend-main.vercel.app/order/create", {
        method: "POST",
        data: { ...formState, pickup: pickup, drop: drop, amount: amount, payment_method: "cod", status: "new", droplocations: droplocations, commission: priceData?.instaport_commission, payment_address: paymentAddress },
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      })
        .then((res) => {
          if (res.data.error) {
            console.log(res.data)
          } else {
            set(ref(db, 'orders/' + res.data.order._id), res.data.order);
            alert(res.data.message)
            setShow(false)
            setShowNote(true)
          }
        })
        .catch((err) => {
          console.error(err)
        })
    } else if (payment === "online") {
      fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then((data) => {
          ip = data.ip
        });
      axios("https://instaport-backend-main.vercel.app/auth/create-order/upi", {
        method: "POST",
        data: {
          ip: ip,
          user_agent: window.navigator.userAgent,
          amount: amount
        },
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
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
  }

  const calculateDistance = async (source, destination) => {
    try {
      let key = "AIzaSyCQb159dbqJypdIO1a1o0v_mNgM5eFqVAo"
      let pickupEncoded = `${source.latitude},${source.longitude}`;
      let dropEncoded = `${destination.latitude},${destination.longitude}`;
      let url =
        `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${pickupEncoded}&origins=${dropEncoded}&key=${key}`;
      const response = await axios(url)
      const route = response.rows[0];
      if (route && route.elements && route.legs.length > 0) {
        return (route.elements[0].distance.value / 1000).toFixed(2);
      } else {
        return 0;
      }
      // const google = window.google;
      // const directionsService = new google.maps.DirectionsService();
      // let obj = await directionsService.route(
      //   {
      //     origin: { lat: source.latitude, lng: source.longitude },
      //     destination: { lat: destination.latitude, lng: destination.longitude },
      //     travelMode: google.maps.TravelMode.DRIVING,
      //   },
      //   (response, status) => {
      //     if (status === 'OK') {
      //       const route = response.routes[0];
      //      
      //     } else {
      //       return 0;
      //     }
      //   }
      // );
      // return obj.routes[0].legs[0].distance.value / 1000;
    } catch (error) {
      alert("Something went wrong! Try reloading the page!");
      return 0;
    }

  }

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.id]: e.target.value
    })
  }

  const handleAddDeliveryPoint = () => {
    let arr = [...droplocations];
    arr.push(addressInitialState);
    setDroplocations(arr);
  }

  const fetchDistanceAndCost = () => {
    axios("https://instaport-backend-main.vercel.app/price/get")
      .then(async (res) => {
        let priceData = res.data?.priceManipulation;
        const mainDistance = await calculateDistance(pickup, drop);
        let distance = 0;
        let price = 0;
        if (droplocations.length != 0) {
          price = mainDistance * priceData?.per_kilometer_charge;
          for (let index = 0; index < droplocations.length; index++) {
            const element = droplocations[index];
            if (index == 0) {
              let gap = await calculateDistance(drop, element)
              distance += gap;
              price += gap * priceData.additional_per_kilometer_charge
            } else {
              let gap = await calculateDistance(droplocations[index - 1], element)
              distance += gap;
              price += gap * priceData.additional_per_kilometer_charge
            }
          }
          if (distance < 1.0) {
            price = priceData?.base_order_charges
          } else {
            price = priceData?.per_kilometer_charge * distance + priceData?.base_order_charges
          }
        } else {
          console.log(mainDistance)
          if (mainDistance < 1.0) {
            price = priceData?.base_order_charges
          } else {
            price = priceData?.per_kilometer_charge * mainDistance + priceData?.base_order_charges
          }
        }
        let finalAmount = formState.parcel_weight === weight[0] || formState.parcel_weight == weight[1] ? price : formState.parcel_weight === weight[2] ? price + 50 : formState.parcel_weight === weight[3] ? price + 100 : price + 150
        if (mainDistance == 0) {
          setAmount(0)
        } else {
          setAmount(finalAmount)
        }
      })
  }

  const handleRemove = (dropIndex) => {
    let confirm = window.confirm("Are you sure you want to delete the drop point?");
    if (confirm) {
      let data = droplocations.filter((value, index) => {
        return index != dropIndex
      });
      setDroplocations(data);
    } else {
      return
    }
  }
  return (
    <>
      <section id='main' className='h-auto w-screen Poppins flex flex-col bg-[#fafae0]'>
        <Navbar />
        <div className='h-auto w-screen flex flex-col items-center lg:px-24 px-5 lg:text-left text-center relative'>
          <div className='w-full flex lg:justify-start justify-center'>
            <h1 className='text-3xl md:text-5xl pt-36 font-semibold mb-3 self-start lg:text-left text-center'>Create an Order</h1>
          </div>
          {/* first box */}
          <div className='border-accentYellow border-2 bg-white lg:w-[80%] w-full h-auto flex lg:flex-row flex-col gap-8 my-4 lg:py-8 py-4 lg:px-10 px-4 rounded-2xl'>
            <div onClick={() => { setFormState({ ...formState, delivery_type: "now" }) }} className={formState?.delivery_type === "now" ? 'lg:w-1/2 w-full lg:p-5 p-3 flex gap-3 border-accentYellow bg-accentYellow duration-200 border-2 rounded-xl cursor-pointer' : 'lg:w-1/2 w-full lg:p-5 p-3 flex gap-3 border-accentYellow duration-200 border-2 rounded-xl cursor-pointer'}>
              <div className='text-2xl'>
                <LuClock3 />
              </div>
              <div>
                <div className='text-xl font-medium leading-tight'>Deliver Now</div>
                <div className='font-medium '>from ₹{priceData?.base_order_charges}</div>
                <div className='text-sm text-gray-500'>The closest courier will be designated to pick up and deliver as soon as possible.</div>
              </div>
            </div>
            <div onClick={() => { setFormState({ ...formState, delivery_type: "scheduled" }) }} className={formState?.delivery_type === "scheduled" ? 'lg:w-1/2 w-full lg:p-5 p-3 flex gap-3 border-accentYellow bg-accentYellow duration-200 border-2 rounded-xl cursor-pointer' : 'lg:w-1/2 w-full lg:p-5 p-3 flex gap-3 border-accentYellow duration-200 border-2 rounded-xl cursor-pointer'}>
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
              <button type='button' onClick={() => { setFormState({ ...formState, parcel_weight: weight[0] }) }} className={formState?.parcel_weight !== weight[0] ? 'w-[135px] outline-none rounded-xl px-5 py-2 border-accentYellow border-2 hover:shadow-md duration-200 ' : "bg-accentYellow w-[135px] outline-none rounded-xl px-5 py-2 border-accentYellow border-2 hover:shadow-md duration-200 "}>{weight[0]}</button>
              <button type='button' onClick={() => { setFormState({ ...formState, parcel_weight: weight[1] }) }} className={formState?.parcel_weight !== weight[1] ? 'w-[135px] outline-none rounded-xl px-5 py-2 border-accentYellow border-2 hover:shadow-md duration-200 ' : "bg-accentYellow w-[135px] outline-none rounded-xl px-5 py-2 border-accentYellow border-2 hover:shadow-md duration-200 "}>{weight[1]}</button>
              <button type='button' onClick={() => { setFormState({ ...formState, parcel_weight: weight[2] }) }} className={formState?.parcel_weight !== weight[2] ? 'w-[135px] outline-none rounded-xl px-5 py-2 border-accentYellow border-2 hover:shadow-md duration-200 ' : "bg-accentYellow w-[135px] outline-none rounded-xl px-5 py-2 border-accentYellow border-2 hover:shadow-md duration-200 "}>{weight[2]}</button>
              <button type='button' onClick={() => { setFormState({ ...formState, parcel_weight: weight[3] }) }} className={formState?.parcel_weight !== weight[3] ? 'w-[135px] outline-none rounded-xl px-5 py-2 border-accentYellow border-2 hover:shadow-md duration-200 ' : "bg-accentYellow w-[135px] outline-none rounded-xl px-5 py-2 border-accentYellow border-2 hover:shadow-md duration-200 "}>{weight[3]}</button>
              <button type='button' onClick={() => { setFormState({ ...formState, parcel_weight: weight[4] }) }} className={formState?.parcel_weight !== weight[4] ? 'w-[135px] outline-none rounded-xl px-5 py-2 border-accentYellow border-2 hover:shadow-md duration-200 ' : "bg-accentYellow w-[135px] outline-none rounded-xl px-5 py-2 border-accentYellow border-2 hover:shadow-md duration-200 "}>{weight[4]}</button>
            </div>
          </div>

          {/* third box */}
          <div className='border-accentYellow border-2 bg-white lg:w-[80%] w-full h-auto flex flex-col lg:gap-3 gap-3 my-4 lg:py-8 py-4 lg:px-10 px-4 rounded-2xl'>
            <h1 className='text-xl mb-1 font-bold'>Pickup Point</h1>
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
                  setPickup({ ...pickup, text: e, })
                }}
                onSelect={(e) => {
                  let key = uuidv4();
                  setPickup({ ...pickup, text: e, })
                  geocodeByAddress(e)
                    .then(results => getLatLng(results[0]))
                    .then(latLng => {
                      setPickup({ ...pickup, latitude: latLng.lat, longitude: latLng.lng, text: e, key: key })
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
                        placeholder: 'Pick your pickup address',
                        className: 'w-full location-search-input outline-none rounded-xl px-7 py-3 border-accentYellow border-2 w-full',
                      })}
                    />
                    <div className="absolute autocomplete-dropdown-container w-full shadow-lg">
                      {loading && <div className='w-full px-3 py-3 bg-white'>Loading...</div>}
                      {suggestions.map((suggestion, index) => {
                        const className = suggestion.active
                          ? 'suggestion-item--active px-3 py-3'
                          : 'suggestion-item px-3 py-3';
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
            <Input onChange={(e) => { setPickup({ ...pickup, address: e.target.value }) }} value={pickup.address} label={"Address"} type={"text"} placeholder={"Enter your address"} id={"address"} />
            <div className='grid lg:grid-cols-2 gap-4'>
              <Input onChange={(e) => { setPickup({ ...pickup, building_and_flat: e.target.value }) }} value={pickup.building_and_flat} label={"Building / Flat"} type={"text"} placeholder={"Enter your Building / Flat"} id={"building_and_flat"} />
              <Input onChange={(e) => { setPickup({ ...pickup, floor_and_wing: e.target.value }) }} value={pickup.floor_and_wing} label={"Floor / Wing"} type={"text"} placeholder={"Enter your Floor / Wing"} id={"floor_and_wing"} />
            </div>
            <div className={formState.delivery_type == "scheduled" ? 'grid lg:grid-cols-2 gap-4' : "hidden"}>
              <Input onChange={(e) => { setPickup({ ...pickup, date: e.target.value }) }} value={pickup.date} label={"Date"} type={"date"} placeholder={"Enter your Date"} id={"date"} />
              <Input onChange={(e) => { setPickup({ ...pickup, time: e.target.value }) }} value={pickup.time} label={"Time"} type={"time"} placeholder={"Enter your Time"} id={"time"} />
            </div>
            <div className='grid lg:grid-cols-2 gap-4'>
              <Input onChange={(e) => {
                let text = formatPhoneNumber(e.target.value)
                setPickup({ ...pickup, phone_number: text })
              }} value={pickup.phone_number} label={"Mobile Number"} type={"text"} placeholder={"Enter your 10 digit mobile number"} id={"phone_number"} />
              <Input onChange={(e) => { setPickup({ ...pickup, name: e.target.value }) }} value={pickup.name} label={"Name"} type={"text"} placeholder={"Enter your name"} id={"name"} />
            </div>
            <Input onChange={(e) => { setPickup({ ...pickup, instructions: e.target.value }) }} value={pickup.instructions} label={"Instructions"} type={"text"} placeholder={"Instructions"} id={"instructions"} />
          </div>

          {/* fourth box */}
          <div className='border-accentYellow border-2 bg-white lg:w-[80%] w-full h-auto flex flex-col lg:gap-3 gap-3 my-4 lg:py-8 py-4 lg:px-10 px-4 rounded-2xl'>
            <h1 className='text-xl mb-1 font-bold'>Drop Point</h1>
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
                  let key = uuidv4()
                  setDrop({ ...drop, text: e })
                  geocodeByAddress(e)
                    .then(results => getLatLng(results[0]))
                    .then(latLng => {
                      setDrop({ ...drop, text: e, latitude: latLng.lat, longitude: latLng.lng, key: key })
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
                        placeholder: 'Pick your drop address',
                        className: 'w-full location-search-input outline-none rounded-xl px-7 py-3 border-accentYellow border-2 w-full',
                      })}
                    />
                    <div className="absolute autocomplete-dropdown-container w-full shadow-lg">
                      {loading && <div className='w-full px-3 py-3 bg-white'>Loading...</div>}
                      {suggestions.map(suggestion => {
                        const className = suggestion.active
                          ? 'suggestion-item--active px-3 py-3'
                          : 'suggestion-item px-3 py-3';
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
            <Input onChange={(e) => { setDrop({ ...drop, address: e.target.value }) }} value={drop.address} label={"Address"} type={"text"} placeholder={"Enter your address"} id={"address"} />
            <div className='grid lg:grid-cols-2 gap-4'>
              <Input onChange={(e) => { setDrop({ ...drop, building_and_flat: e.target.value }) }} value={drop.building_and_flat} label={"Building / Flat"} type={"text"} placeholder={"Enter your Building / Flat"} id={"building_and_flat"} />
              <Input onChange={(e) => { setDrop({ ...drop, floor_and_wing: e.target.value }) }} value={drop.floor_and_wing} label={"Floor / Wing"} type={"text"} placeholder={"Enter your Floor / Wing"} id={"floor_and_wing"} />
            </div>
            <div className={formState.delivery_type == "scheduled" ? 'grid lg:grid-cols-2 gap-4' : "hidden"}>
              <Input onChange={(e) => { setDrop({ ...drop, date: e.target.value }) }} value={drop.date} label={"Date"} type={"date"} placeholder={"Enter your Date"} id={"date"} />
              <Input onChange={(e) => { setDrop({ ...drop, time: e.target.value }) }} value={drop.time} label={"Time"} type={"time"} placeholder={"Enter your Time"} id={"time"} />
            </div>
            <div className='grid lg:grid-cols-2 gap-4'>
              <Input onChange={(e) => {
                let text = formatPhoneNumber(e.target.value)
                setDrop({ ...drop, phone_number: text })
              }} value={drop.phone_number} label={"Mobile Number"} type={"text"} placeholder={"Enter your 10 digit mobile number"} id={"phone_number"} />
              <Input onChange={(e) => { setDrop({ ...drop, name: e.target.value }) }} value={drop.name} label={"Name"} type={"text"} placeholder={"Enter your name"} id={"name"} />
            </div>
            <Input onChange={(e) => { setDrop({ ...drop, instructions: e.target.value }) }} value={drop.instructions} label={"Instructions"} type={"text"} placeholder={"Instructions"} id={"instructions"} />
          </div>

          {
            droplocations?.map((droplocation, index) => {
              return <div className='border-accentYellow border-2 bg-white lg:w-[80%] w-full h-auto flex flex-col lg:gap-3 gap-3 my-4 lg:py-8 py-4 lg:px-10 px-4 rounded-2xl'>
                <div className='flex justify-between'>
                  <h1 className='text-xl mb-1 font-bold'>Drop Point {index + 2}</h1>
                  <span onClick={() => handleRemove(index)} className='flex justify-center items-center h-7 w-7 bg-red-500 text-xl mb-1 font-bold text-white rounded-md cursor-pointer'><FiTrash2 className='text-lg' /></span>
                </div>
                <div className='w-full flex flex-col items-start'>
                  <label htmlFor={"droppoint"} className='pb-1 text-sm lg:text-base' >{"Drop Address"}</label>
                  <PlacesAutocomplete
                    searchOptions={{
                      componentRestrictions: {
                        country: ['in']
                      }
                    }}
                    value={droplocation.text}
                    onChange={(e) => {
                      let obj = { ...droplocations[index] }
                      obj.text = e
                      let arr = [...droplocations];
                      arr[index] = obj;
                      setDroplocations(arr);
                    }}
                    onSelect={(e) => {
                      let key = uuidv4()
                      let obj = { ...droplocations[index] }
                      obj.text = e
                      obj.key = key
                      let arr = [...droplocations];
                      arr[index] = obj;
                      setDroplocations(arr);
                      geocodeByAddress(e)
                        .then(results => getLatLng(results[0]))
                        .then(latLng => {
                          let obj = { ...droplocations[index] }
                          obj.text = e
                          obj.key = key
                          obj.latitude = latLng.lat
                          obj.longitude = latLng.lng
                          let arr = [...droplocations];
                          arr[index] = obj;
                          setDroplocations(arr);
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
                            placeholder: 'Pick your drop address',
                            className: 'w-full location-search-input outline-none rounded-xl px-7 py-3 border-accentYellow border-2 w-full',
                          })}
                        />
                        <div className="absolute autocomplete-dropdown-container w-full shadow-lg">
                          {loading && <div className='w-full px-3 py-3 bg-white'>Loading...</div>}
                          {suggestions.map(suggestion => {
                            const className = suggestion.active
                              ? 'suggestion-item--active px-3 py-3'
                              : 'suggestion-item px-3 py-3';
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
                <Input onChange={(e) => {
                  let obj = { ...droplocations[index] }
                  obj.address = e.target.value
                  let arr = [...droplocations];
                  arr[index] = obj;
                  setDroplocations(arr);
                }} value={droplocation?.address} label={"Address"} type={"text"} placeholder={"Enter your address"} id={"address"} />
                <div className='grid lg:grid-cols-2 gap-4'>
                  <Input onChange={(e) => {
                    let obj = { ...droplocations[index] }
                    obj.building_and_flat = e.target.value
                    let arr = [...droplocations];
                    arr[index] = obj;
                    setDroplocations(arr);
                  }} value={droplocation?.building_and_flat} label={"Building / Flat"} type={"text"} placeholder={"Enter your Building / Flat"} id={"building_and_flat"} />
                  <Input onChange={(e) => {
                    let obj = { ...droplocations[index] }
                    obj.floor_and_wing = e.target.value
                    let arr = [...droplocations];
                    arr[index] = obj;
                    setDroplocations(arr);
                  }} value={droplocation?.floor_and_wing} label={"Floor / Wing"} type={"text"} placeholder={"Enter your Floor / Wing"} id={"floor_and_wing"} />
                </div>
                <div className={formState.delivery_type == "scheduled" ? 'grid lg:grid-cols-2 gap-4' : "hidden"}>
                  <Input onChange={(e) => {
                    let obj = { ...droplocations[index] }
                    obj.date = e.target.value
                    let arr = [...droplocations];
                    arr[index] = obj;
                    setDroplocations(arr);
                  }} value={droplocation?.date} label={"Date"} type={"date"} placeholder={"Enter your Date"} id={"date"} />
                  <Input onChange={(e) => {
                    let obj = { ...droplocations[index] }
                    obj.time = e.target.value
                    let arr = [...droplocations];
                    arr[index] = obj;
                    setDroplocations(arr);
                  }} value={droplocation?.time} label={"Time"} type={"time"} placeholder={"Enter your Time"} id={"time"} />
                </div>
                <div className='grid lg:grid-cols-2 gap-4'>
                  <Input onChange={(e) => {
                    let obj = { ...droplocations[index] }
                    let text = formatPhoneNumber(e.target.value)
                    obj.phone_number = text
                    let arr = [...droplocations];
                    arr[index] = obj;
                    setDroplocations(arr);
                  }} value={droplocation?.phone_number} label={"Mobile Number"} type={"text"} placeholder={"Enter your 10 digit mobile number"} id={"phone_number"} />
                  <Input onChange={(e) => {
                    let obj = { ...droplocations[index] }
                    obj.name = e.target.value
                    let arr = [...droplocations];
                    arr[index] = obj;
                    setDroplocations(arr);
                  }} value={droplocation?.name} label={"Name"} type={"text"} placeholder={"Enter your name"} id={"name"} />
                </div>
                <Input onChange={(e) => {
                  let obj = { ...droplocations[index] }
                  obj.instructions = e.target.value
                  let arr = [...droplocations];
                  arr[index] = obj;
                  setDroplocations(arr);
                }} value={droplocation?.instructions} label={"Instructions"} type={"text"} placeholder={"Instructions"} id={"instructions"} />
              </div>
            })
          }

          {/* fifth box */}
          <div onClick={handleAddDeliveryPoint} className='cursor-pointer bg-accentYellow lg:w-[80%] w-full h-auto flex flex-col gap-6 my-4 py-3 px-10 rounded-2xl'>
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
            <Input onChange={(e) => {
              let text = formatPhoneNumber(e.target.value)
              setFormState({
                ...formState,
                phone_number: text
              })
            }} value={formState.phone_number} label={"Phone Number"} type={"text"} placeholder={"Enter phone number"} id={"phone_number"} />
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

          {/* tenth box */}
          <div className='border-accentYellow border-2 bg-white lg:w-[80%] w-full h-auto flex flex-col gap-6 my-4 lg:py-8 py-4 lg:px-10 px-4 rounded-2xl'>
            <Button onClick={fetchDistanceAndCost} type="button" text={"Calculate Fare"} className={"py-3"} />
            <h1 className='text-lg flex items-center'>Order Amount - ₹{amount.toFixed(2)}</h1>
            {/* <span className='absolute right-10 top-5 text-lg'><IoIosArrowDown /></span> */}
          </div>

          <Button onClick={() => { setShow(true); fetchDistanceAndCost() }} type="button" text={"Place Order"} className={"mt-14 mb-6 py-3"} />
          {/* <Button onClick={() => { setShow(true); fetchDistanceAndCost() }} type="button" text={"Place Order"} className={"mt-14 mb-6 py-3"} /> */}

          <div className='border-accentYellow border-2 bg-white lg:w-[80%] w-full h-auto flex flex-col lg:text-center text-left my-4 gap-2 lg:py-8 py-4 lg:px-10 px-4 rounded-2xl'>
            <p>Clicking "Submit order" sends your request to the couriers and signifies your acceptance of the terms of the agreements as well as our terms and conditions.</p>
            <p className='mt-2'>After submitting an order, SMS alerts can be configured.</p>
            <p className='mt-3 font-semibold'>Simple steps to order a delivery boy are as follows:</p>
            <p>Please give us the following information: addresses, contact information for each address, preferred delivery time, and delivery weight.</p>
            <p>Click "Submit order" if you agree with our quote.</p>
            <p>Get a call from the delivery lad who will be delivering your purchase. Negotiate a price at which he will be compensated. Give him further information about your package and the method you want.</p>
            <p>If you have any questions, contact us by message or phone our operator. By selecting the 'Order' option, you will receive the Operator's phone number, save it together with the order number.</p>
            <p>Have your delivery done. Give the courier his signature directly on his smartphone's screen to confirm everything was done correctly. To assist us in selecting the very best couriers, you can evaluate a courier once the delivery is complete.</p>
            <p className='mt-3'>Many thanks, Team Instaport</p>
            <p>Regards, MAHESH HARISH CHOROTIYA</p>
          </div>

          <a href={"#main"} ><Button type="button" text={"Scroll to top"} className={"my-4 py-3"} /></a>

          {/* <div className='border-y-2 border-gray-200 w-full flex flex-col py-9 mt-3 gap-4 justify-center items-center'>
            <p>We are open to feedback, Please give your valuable feedback at the Link given below</p>
            <Button type="button" text={"Give Feedback"} className={"py-3"} />
          </div> */}


          <section className={show ? 'flex justify-center items-center z-[5000] fixed top-0 left-0 bg-black/40 h-screen w-screen opacity-100 duration-200 pointer-events-auto' : 'z-[5000] fixed top-0 left-0 bg-black/40 h-screen w-screen opacity-0 duration-200 pointer-events-none flex justify-center items-center '}>
            <div className='border-accentYellow border-2 bg-white lg:w-[40%] w-full h-auto flex flex-col gap-6 my-4 lg:py-8 py-4 lg:px-10 px-4 rounded-2xl'>
              <div className='flex justify-between items-center'>
                <h1 className='text-xl text-left w-full font-bold'>Payment Type</h1>
                <span className='cursor-pointer bg-gray-50 hover:bg-gray-100 duration-200 h-8 w-8 flex justify-center items-center rounded-md' onClick={() => setShow(false)}><IoIosClose className='text-3xl' /></span>
              </div>
              <div>
                <div>
                  <Input value={amount.toFixed(2)} label={"Amount"} onChange={() => { }} />
                </div>
              </div>
              {payment == "cod" && <div className='flex flex-col'>
                <h2 className='text-lg text-left w-full font-bold mb-1'>Payment Address</h2>
                <div className='flex flex-col gap-2'>
                  <div onClick={() => { setPaymentAddress(pickup) }} className={paymentAddress?.key == pickup.key ? 'px-5 py-3 bg-white border-accentYellow border-2 rounded-lg' : 'px-5 py-3 bg-white border-2 rounded-lg'}>{pickup?.address}</div>
                  <div onClick={() => { setPaymentAddress(drop) }} className={paymentAddress?.key == drop.key ? 'px-5 py-3 bg-white border-accentYellow border-2 rounded-lg' : 'px-5 py-3 bg-white border-2 rounded-lg'}>{drop?.address}</div>
                  {
                    droplocations.map((droppoint, index) => {
                      return <div key={index} onClick={() => { setPaymentAddress(droppoint) }} className={paymentAddress?.key == droppoint?.key ? 'px-5 py-3 bg-white border-accentYellow border-2 rounded-lg' : 'px-5 py-3 bg-white border-2 rounded-lg'}>{droppoint?.address}</div>
                    })
                  }
                </div>
              </div>}
              <div className='w-[60%] m-auto flex justify-center gap-6' >
                <button type='button' onClick={() => { setPayment("online") }} className={payment === "online" ? 'outline-none rounded-xl px-7 py-2 bg-accentYellow border-accentYellow border-2 hover:shadow-md duration-200 ' : 'outline-none rounded-xl px-7 py-2 border-accentYellow border-2 hover:shadow-md duration-200 '}>Online</button>
                <button type='button' onClick={() => { setPayment("cod") }} className={payment === "cod" ? 'outline-none rounded-xl px-7 py-2 bg-accentYellow border-accentYellow border-2 hover:shadow-md duration-200 ' : 'outline-none rounded-xl px-7 py-2 border-accentYellow border-2 hover:shadow-md duration-200 '}>COD</button>
              </div>
              <div className='flex justify-center items-center'><Button type="button" onClick={handlePayment} text={"Place Order"} className={"mx-auto"} /></div>
            </div>
          </section>
        </div>
        <Footer />

        <div className={showNote ? 'fixed top-0 left-0 h-screen w-screen flex items-center justify-center z-[60] bg-black/40 opacity-100 duration-100 pointer-events-auto' : 'duration-100 pointer-events-none opacity-0 fixed top-0 left-0 h-screen w-screen flex items-center justify-center z-[60] bg-black/40'}>
          <div className='p-4 rounded-lg bg-white lg:w-[40vw] w-[80vw]'>
            <div className='flex justify-between items-center'>
              <h1 className='text-xl text-left w-full font-bold'>Note</h1>
              <span className='cursor-pointer bg-gray-50 hover:bg-gray-100 duration-200 h-8 w-8 flex justify-center items-center rounded-md' onClick={() => {
                setShowNote(false);
                window.location.reload();
              }}><IoIosClose className='text-3xl' /></span>
            </div>
            <div className='py-2 flex flex-col'>
              <h2>For better experience download our app.</h2>
              <div className='flex items-center mt-3 gap-4'>
                <img src="/assets/footer/appstore.png" alt="" />
                <img src="/assets/footer/playstore.png" alt="" />
              </div>
            </div>
          </div>
        </div>

      </section>
    </>
  )
}

export default CreateOrder