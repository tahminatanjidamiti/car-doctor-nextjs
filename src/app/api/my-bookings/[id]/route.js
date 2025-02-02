import { authOptions } from "@/lib/authOptions";
import dbConnect, { collectionNamesObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";


export const GET = async (req, { params }) => {
    const p = await params;
    const bookingCollection = dbConnect(collectionNamesObj.bookingCollection);
    const query = { _id: new ObjectId(p.id) }
    const singleBooking = await bookingCollection.findOne(query);
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    const isOwnerOk = email === singleBooking.email;
    if (isOwnerOk) {
        return NextResponse.json(singleBooking)
    }
    else {
        return NextResponse.json({ success: false, message: "Forbidden Get Data Action!" }, { status: 401 });
    }
   
}
export const PATCH = async (req, { params }) => {
    const p = await params;
    const bookingCollection = dbConnect(collectionNamesObj.bookingCollection);
    const query = { _id: new ObjectId(p.id) }
    //validation
    const session = await getServerSession(authOptions);
    const currentBookingData = await bookingCollection.findOne(query);
    const email = session?.user?.email;
    const isOwnerOk = email === currentBookingData.email;
    if (isOwnerOk) {
        const body = await req.json();
        const option = { upsert: true }
        const filter = {
            $set: { ...body }
        }
        const updateResponse = await bookingCollection.updateOne(query, filter, option)
        revalidatePath("/my-bookings")
        return NextResponse.json(updateResponse)
    }
    else {
        return NextResponse.json({ success: false, message: "Forbidden Update Action!" }, { status: 401 });
    }

}