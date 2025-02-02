import dbConnect, { collectionNamesObj } from '@/lib/dbConnect';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaArrowRight } from "react-icons/fa";

const ServicesSection = async () => {
    // const res = await fetch("./services.json");
    // const data = await res.json();
    const serviceCollection = dbConnect(collectionNamesObj.serviceCollection);
    const data = await serviceCollection.find({}).toArray();

    return (
        <div className='grid grid-cols-12 gap-4 container mx-auto'>
            {data.map((item) => {
                return (
                    <div className='col-span-12 md:col-span-6 lg:col-span-4 p-4 h-full border' key={item._id}>
                        <figure className='w-full h-3/4 flex justify-center items-center'>
                            <Image className='w-full h-full object-fit' src={item.img} width={314} height={208} alt={item.title} />
                        </figure>
                        <div className='flex justify-between items-center mt-4'>
                            <div>
                                <h2 className='text-xl font-bold'>{item.title}</h2>
                                <p className='text-xl font-bold text-orange-500'>Price : ${item.price}</p>
                            </div>
                            <div>
                                <Link href={`/services/${item._id}`} className='text-orange-500'><FaArrowRight /></Link>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

export default ServicesSection;