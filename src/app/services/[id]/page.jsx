import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export default async function ServiceDetailsPage({ params }) {
    const p = await params;
    const res = await fetch(`https://nextjs-car-doctor-two.vercel.app/api/service/${p.id}`)
    const data = await res.json()
    return (
        <div>
            <section className='flex justify-center'>
                <figure className='relative'>
                    <Image src={"/assets/images/checkout/checkout.png"} width={1137} height={300} alt={"Banner!"} />
                    <div className='transparent-layer hero-overlay absolute w-full h-full border-2 border-red-400 top-0'>
                        <div className='w-full h-full font-bold text-2xl flex items-center ps-16'>
                            <div>
                                <h1 className='text-white'>Service Details</h1>
                            </div>
                        </div>
                    </div>
                </figure>
            </section>
            <section>
                <div className='flex justify-between mt-8 w-full md:container lg:w-[1137px] mx-auto'>
                    <figure>
                        <Image src={data.img} width={800} height={300} alt={data.title} />
                    </figure>
                    <div>
                        <Link href={`/checkout/${data._id}`}><button className="btn btn-wide bg-orange-500">Checkout</button></Link>
                        <h2>Price: ${data.price}</h2>
                    </div>
                </div>

                <div className=' w-full md:container lg:w-[1137px] mx-auto'><h1 className='my-5 font-bold text-3xl'>{data.title}</h1>
                <p className='my-5'>{JSON.stringify(data)}</p></div>
            </section>

        </div>
    )
}
