"use client"
import { useRouter } from 'next/navigation';
import React from 'react'
import { MdDelete } from "react-icons/md";

export default function DeleteBookingButton({id}) {
    const router = useRouter()
    const handleDelete = async (id) => {
        const res = await fetch(`https://nextjs-car-doctor-two.vercel.app/api/service/${id}`, {
            method: "DELETE",
        });
        const data = await res.json();
        router.refresh();
    }
  return (
   <> <MdDelete onClick={() => handleDelete(id)} className="h-8 w-8 font-bold" /></>
  )
}
