import React, { useState } from 'react'
import Input from './Input'
import axios from 'axios'

const Signin = ({ showSigninModal, setShowSigninModal }) => {
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [signin, setSignin] = useState(true);
  const handleSignin = (e) => {
    e.preventDefault()
    if (signin) {
      if (phone && password) {
        axios("https://instaport-backend-main.vercel.app/user/signin", {
          method: "POST",
          data: { mobileno: phone, password }
        })
          .then((res) => {
            if (!res.data.error) {
              localStorage.setItem("token", res.data.token)
              alert(res.data.message)
              window.location.reload()
            }
          })
          .catch((err) => {
            alert(err.messsage)
          })
      }
    } else {
      if (phone && password && name) {
        axios("https://instaport-backend-main.vercel.app/user/signup", {
          method: "POST",
          data: { mobileno: phone, password, fullname: name, usecase: "individual" }
        })
          .then((res) => {
            if (!res.data.error) {
              alert(res.data.message)
              alert("You can now login to your account");
              window.location.reload()
            }
          })
          .catch((err) => {
            alert(err.messsage)
          })
      }
    }
  }

  return (
    <div>

      <div id="authentication-modal" tabindex="-1" aria-hidden="true" class={showSigninModal ? "bg-black/50 h-screen flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-[50000] justify-center items-center w-full md:inset-0 opacity-100 duration-500" : "bg-black/50 h-screen flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-[50000] justify-center items-center w-full md:inset-0 opacity-0 pointer-events-none duration-500"}>
        <div class="relative p-4 w-full max-w-md max-h-full">

          <div class="relative bg-white rounded-lg shadow">

            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
              <h3 class="text-xl font-semibold text-gray-900 ">
                {signin ? "Sign in" : "Sign up"} to our platform
              </h3>
              <button onClick={() => setShowSigninModal(false)} type="button" class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="authentication-modal">
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
            </div>
            <div class="p-4 md:p-5">
              <form onSubmit={handleSignin} class="space-y-4" action="#">
                {!signin && <div>
                  <label for="name" class="block mb-2 text-sm font-medium text-gray-900">Your Full name</label>
                  <Input onChange={(e) => setName(e.target.value)} type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="John Doe" required={!signin} />
                </div>}
                <div>
                  <label for="phone" class="block mb-2 text-sm font-medium text-gray-900">Your phone number</label>
                  <Input onChange={(e) => setPhone(e.target.value)} type="text" name="phone" id="phone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="name@company.com" required={true} />
                </div>
                <div>
                  <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Your password</label>
                  <Input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required={true} />
                </div>
                {signin && <div class="flex justify-end">
                  <a href="#" class="text-sm text-accentYellow hover:underline">Forget Password?</a>
                </div>}
                <button type="submit" class="w-full text-white bg-accentYellow hover:bg-accentYellow focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">{signin ? "Login to your account" : "Create Account"}</button>
                <div class="text-sm font-medium text-gray-500 text-center">
                  {signin ? "Not registered?" : "Already Registered?"} <a onClick={() => { setSignin(!signin) }} class="cursor-pointer text-accentYellow hover:underline">{signin ? "Create account" : "Login Account"}</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Signin
