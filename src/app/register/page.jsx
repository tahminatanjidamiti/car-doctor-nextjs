import Image from 'next/image'
import React from 'react'
import RegisterForm from './components/RegisterForm'


export default function RegisterPage() {
    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <h1 className="text-5xl font-bold ml-6 mt-2">Register now!</h1>
                        <RegisterForm></RegisterForm>
                    </div>
                    <div className="text-center lg:text-left">
                        <Image src={"/assets/images/login/login.svg"} width={500} height={300} alt={"Register!"} />
                    </div>
                </div>
            </div>
        </div>
    )
}
