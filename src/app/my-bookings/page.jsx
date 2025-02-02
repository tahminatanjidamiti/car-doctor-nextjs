// "use client"
import MyBookingsTable from "@/components/tables/MyBookingsTable";
import { headers } from "next/headers";
// import { useEffect, useState } from "react";

const fetchMyBookings = async () => {
    const res = await fetch("https://nextjs-car-doctor-two.vercel.app/api/service", {
        headers: new Headers(await headers()),
    });
    const d = await res.json();
    return d;
};

export default async function MyBookingsPage () {
    const data = await fetchMyBookings()
    

// const [data, setData] = useState([]);
// useEffect(() => {
    
//     fetchMyBookings()
// }, [])
    return (
        <div><MyBookingsTable data={data}></MyBookingsTable></div>
    )
}
