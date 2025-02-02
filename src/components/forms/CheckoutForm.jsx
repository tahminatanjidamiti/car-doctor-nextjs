"use client"
import { useSession } from 'next-auth/react'
import React from 'react'
import toast from 'react-hot-toast'

export default function CheckoutForm({data}) {

const {data: session} = useSession();

    const handleCheckoutService = async (e) => {
        e.preventDefault()
        toast("Submitting Booking...");
        const form = e.target;
        const name = form.name.value;
        const date = form.date.value;
        const phone = form.phone.value;
        const address = form.address.value;
        const email = form.email.value;
        const bookingPayload = {
            //Session
            customerName: name,
            email,
            //User Inputs
            date,
            phone,
            address,
            //Extra Information
            service_name: data?.title,
            service_id: data?._id,
            service_img: data?.img,
            service_price: data?.price,
        };
        const res = await fetch("https://nextjs-car-doctor-two.vercel.app/api/service", {
            method: "POST",
            body: JSON.stringify(bookingPayload)
        })
        const postedResponse = await res.json()
    }
  return (
    <div className='my-10'>
        <div className='w-11/12 mx-auto'>
        <h2 className='text-center text-3xl mb-4'>Book Service: {data?.title}</h2>
        <form onSubmit={handleCheckoutService}>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Name</span>
                </label>
                <input defaultValue={session?.user?.name} readOnly type="name" name="name" placeholder="name" className="input input-bordered" required />
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input defaultValue={session?.user?.email} readOnly  type="email" name="email" placeholder="email" className="input input-bordered" required />
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Due Amount</span>
                </label>
                <input defaultValue={data?.price} readOnly  type="text" name="price"className="input input-bordered" required />
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Date</span>
                </label>
                <input type="date" name="date" className="input input-bordered" required />
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Phone</span>
                </label>
                <input type="text" name="phone" placeholder="Your Phone" className="input input-bordered" required />
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Present Address</span>
                </label>
                <input type="text" name="address" placeholder="Your Address" className="input input-bordered" required />
            </div>
            </div>
            <div className='form-control mt-6'>
                <input className='btn btn-primary btn-block' type="submit" value="Order Confirm" />
            </div>
        </form>
        </div>
    </div>
  )
}
