import React from 'react'
import Input from './Input'

const Signin = ({ showSigninModal, setShowSigninModal }) => {

  return (
    <div>

      <div id="authentication-modal" tabindex="-1" aria-hidden="true" class={showSigninModal ? "bg-black/50 h-screen flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 opacity-100 duration-500" : "bg-black/50 h-screen flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 opacity-0 pointer-events-none duration-500"}>
        <div class="relative p-4 w-full max-w-md max-h-full">

          <div class="relative bg-white rounded-lg shadow">

            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
              <h3 class="text-xl font-semibold text-gray-900 ">
                Sign in to our platform
              </h3>
              <button onClick={() => setShowSigninModal(false)} type="button" class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="authentication-modal">
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
            </div>
            <div class="p-4 md:p-5">
              <form class="space-y-4" action="#">
                <div>
                  <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                  <Input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="name@company.com" required />
                </div>
                <div>
                  <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Your password</label>
                  <Input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                </div>
                <div class="flex justify-end">
                  <a href="#" class="text-sm text-accentYellow hover:underline">Forget Password?</a>
                </div>
                <button type="submit" class="w-full text-white bg-accentYellow hover:bg-accentYellow focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Login to your account</button>
                <div class="text-sm font-medium text-gray-500 text-center">
                  Not registered? <a href="#" class="text-accentYellow hover:underline">Create account</a>
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
