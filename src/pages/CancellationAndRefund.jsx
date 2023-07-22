import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export const CancellationAndRefund = () => {
  return (
    <section className='h-auto w-screen Poppins flex flex-col items-center bg-[#fafae0]'>
      <Navbar />
      <section className='w-[80%] mt-[9%] p-7 bg-white rounded-xl border-2 border-accentYellow'>
      <h1 className='text-2xl font-semibold mb-4 text-center'>CANCELLATION AND REFUND</h1>
      <h1 className='text-xl font-semibold mt-4 self-start'>Refund and Cancellation Policy</h1>
      <p className='pb-2'>Our focus is a complete customer satisfaction. In the event, if you are displeased with the services provided, we will refund back the money, provided the reasons are genuine and proved after investigation. Please read the fine prints of each deal before buying it, it provides all the details about the services you purchase.</p>
      <p className=''>In case of dissatisfaction from our services, clients have the liberty to cancel their order and request a refund from us. Our Policy for the cancellation and refund will be as follows:</p>
      <p className='pt-3 font-semibold'>Cancellation Policy</p>
      <ul>
        <li>•	Customer can cancel the order at any time before the order has been initiated or completed by the courier.</li>
        <li>•	Initiation of the order is defined by courier reaching the pick up point in the order schedule. In such cases only partial refund can be provided.</li>
        <li>•	Completion of the order is defined by courier visiting pick up and at least one delivery location within the order schedule. In such instances refund cannot be initiated.</li>
        <li>•	For cancellation customer can use cancellation options in the app or directly from the dashboard of the registered customer account on web portal of the company.</li>
        <li>•	For cancellations with help of Customer Support agent please contact us via chat on the website or app. Our specialist will attend Customer requests in working hours within availability waiting period regulated by Customer Support instructions.</li>
      </ul>
      <p className='pb-2 '>Cancellations fee will be applicable on the orders which were initiated or fully or partially completed as per following:</p>
      <ul>
        <li>•	In case the pick up was done by courier or courier has reached pickup address in scheduled for pickup time or in case of courier has reached pick up address prior 30 minutes to scheduled pickup time and contacted the customer to notify courier has reached: the cancellation fee in such cases will be equal to the pick up charges of the scheduled order.</li>
        <li>•	In case of cash payment for the services the cancellation charges will be debited from Customer Instaport delivery balance in form of credit note and will be applied on next placed by customer order.</li>
        <li>•	In case of noncash payment mode cancellation charges will be directly debited from Customer Instaport delivery prepaid/postpaid balance and the same will reflect in Customer dashboard and the invoice for the period as a cancellation fee. Fee will be applied on the same order number with Instaport delivery, which was cancelled.</li>
      </ul>
      <p className='pt-3 font-semibold'>Refund Policy</p>
      <p className='pb-2 '>After confirmation of the investigation team and their positive feedback the refund will be credited either on Customer Instaport delivery balance in form of credit note or directly to Customer bank account within 7 working days, whichever mode is preferred by Customer.</p>
      <p className='pb-2 '>Liability on goods which are being delivered can be taken by company within the limits of guaranteed amount only and only in case customer has declared the true cost & correct contents of the parcel (guaranteed amount) during order placement on the portal and only if the security fee of 0.85% plus GST from declared cost is paid to the company prior to the order placement. Maximum liability within maximum allowed guarantee amount is 20,000 rupees. Under no circumstances the customer should place orders with value more than 20,000 rupees without prior written confirmation from the management team of Instaport delivery.</p>
      <p>For any dispute or questions, please chat with us.</p>
      </section>
      <Footer />
    </section>
  )
}
