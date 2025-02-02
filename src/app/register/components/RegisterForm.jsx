"use client";
import React from 'react'
import Link from 'next/link'
import { registerUser } from '@/app/actions/auth/registerUser';
import SocialLogin from '@/app/login/components/SocialLogin';

export default function RegisterForm() {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        await registerUser({ name, email, password })
    }
    return (
        <form onSubmit={handleSubmit} className="card-body">
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Name</span>
                </label>
                <input type="name" name="name" placeholder="name" className="input input-bordered" required />
            </div>
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
                <button className="btn bg-orange-600 text-white">Sign Up</button>
            </div>
            <p className="text-center">Or Sign Up with</p>

           <SocialLogin></SocialLogin>

            <p className="text-center">

                Already have an account?{" "}

                <Link href="/login" className="text-orange-500 font-bold">

                    Login

                </Link>

            </p>

        </form>
    )
}
