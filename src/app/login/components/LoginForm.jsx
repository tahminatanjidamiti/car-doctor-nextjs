"use client"
import React from 'react'
import Link from 'next/link'
import { signIn } from "next-auth/react"
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import SocialLogin from './SocialLogin'

export default function LoginForm() {
    const router = useRouter()
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        // console.log({ email, password })
        toast("Submitting...")
        try {
            const response = await signIn("credentials", { email, password, callbackUrl: "/", redirect: false, })
            if (!response.error) {
                toast.success("Logged In Successfully")
                router.push("/")
                form.reset()
            }
            
        } catch (error) {
            toast.error("FAILED to Log In")
        }
    }
    return (
        <form onSubmit={handleSubmit} className="card-body">
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input type="email" name="email" placeholder="email" className="input input-bordered" required />
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Password</span>
                </label>
                <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                <label className="label">
                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
            </div>
            <div className="form-control mt-6">
                <button className="btn bg-orange-600 text-white">Sign In</button>
            </div>
            <p className="text-center">Or Sign In with</p>
            <SocialLogin></SocialLogin>
            <p className="text-center">

                Don't have an account?{" "}

                <Link href="/register" className="text-orange-500 font-bold">

                    Register

                </Link>

            </p>

        </form>
    )
}
