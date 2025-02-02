"use server"
import dbConnect, { collectionNamesObj } from "@/lib/dbConnect";
import bcrypt from "bcrypt";

export const loginUser = async (payload) => {
    const { email, password } = payload;
    const userCollection = dbConnect(collectionNamesObj.userCollection);
    const user = await userCollection.findOne({ email })
    if (!user) return null;
    const isPasswordOK = await bcrypt.compare(password, user.password)
    if (!isPasswordOK) return null;
    return user;
}