"use client";
import { useState } from "react";
import Image from "next/image";
import {signIn} from "next-auth/react";


export default function Loginpage() {
    const [email, setEmail]= useState('');
    const[password , setPassword]= useState('');
    const [loginInProgress, setLoginInProgress] = useState(false);
    async function handleFormSubmit(ev) {
        ev.preventDefault();
        setLoginInProgress(true);
        await signIn('credentials', {email, password , callbackUrl: '/'});
        setLoginInProgress(false);  
    }
    return (
        <section className="mt-8">
            <h1 className="text-4xl text-center text-primary mb-4">Login</h1>
            <form className="max-w-xs mx-auto" onSubmit={handleFormSubmit}>
            <input 
                    name="email"
                     type="email" placeholder="email id" 
                     value={email}
                     disabled={loginInProgress}
                     onChange={ev => setEmail(ev.target.value)}
            />
            <input 
                    name="password"
                     type="password" placeholder="password"
                     value={password}
                     disabled={loginInProgress}
                     onChange={ev => setPassword(ev.target.value)}
            />
            <button type="submit" disabled={loginInProgress}>
                Login
            </button>
            <div className="text-center text-gray-500 my-4">or login with provider</div>
            <button type="button" onClick={() => signIn('google', {callbackUrl: '/'})} className="flex  justify-center gap-4">
                <Image src="/google-icon.png" alt="" width={24} height={24} />
                Login with Google
            </button>
            </form>
        </section>
    );
}