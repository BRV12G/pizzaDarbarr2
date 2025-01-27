"use client";
import Link from "next/link";
import {useSession} from 'next-auth/react';
import {signOut} from 'next-auth/react';
import Registerpage from "@/app/register/page";
import { CartContext } from "../AppContext";
import { useContext } from "react";
import ShoppingCart from "../icons/shoppingCart";

export default function Header() {
  const session = useSession();
  console.log(session);
  const status = session?.status;
  const userData = session.data?.user;
  let userName = userData?.name || userData?.email;
  const {cartProducts} = useContext(CartContext);
  if (userName && userName.includes(' ')) {
    userName = userName.split(' ')[0];
  }
    return (
      <header className="flex items-center justify-between">
        <nav className="flex items-center gap-8 text-gray-500 font-semibold">
          <Link className="text-primary font-semibold text-2xl" href="/">Pizza Darbar</Link>
          <Link href="/">Home</Link>
          <Link href="/menu">Menu</Link>
          <Link href="/#about">About</Link> 
          <Link href="/#contact">Contact</Link> 
        </nav>
        <nav className="flex items-center gap-4">
          {status === 'authenticated' && (
            <>
                 <Link href={"/profile"} 
                   className="text-gray-500 font-semibold whitespace-nowrap">
                    Hello, {userName}
                  </Link>
                 <button 
                      href={"/register"} 
                      onClick={() => signOut() }
                      className="bg-primary text-white px-8 py-2 rounded-full">
                      Logout
                 </button> 
            </>
            
 
          )}

          {status === "unauthenticated" && (
            <>
            <Link href={"/login"} className="text-gray-500 font-semibold">Login</Link>
            <Link href={"/register"} className="bg-primary text-white px-8 py-2 rounded-full">Register</Link> 
            </>
          )}
            <Link href={'/cart'} className="relative">
                 <ShoppingCart /> 
                 {cartProducts?.length > 0 && (
                    <span className="absolute -top-2 -right-3 bg-primary text-white text-xs py-1 px-2 rounded-full leading-3">{cartProducts?.length}</span> 
                 )}
            </Link>
        </nav>
      </header>
    );
}