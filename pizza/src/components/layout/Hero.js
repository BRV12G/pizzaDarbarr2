"use client";
import Image from 'next/image';
import Right from '@/components/icons/right.js'
import { useRouter } from "next/navigation";


export default function Hero() {
   const router = useRouter();

    return (
      <section className="hero md:mt-4">
        <div className='md:py-12 py-8'>
           <h1 className="text-4xl font-semibold"> 
              Everything <br />  
              is better <br /> 
              with a&nbsp;
             <span className='text-primary'>
                Pizza
             </span>
            </h1>
            <p className='my-6 text-gray-500 text-sm'>Pizza is the missing piece that makes every day complete , a simple yet delicious joy in life.</p>
           <div className='flex gap-4 text-sm'>
            {/* <button href ={'/menu'} className= 'bg-primary flex justify-center items-center gap-2 text-white px-4 py-2 rounded-full uppercase'>
                Order Now
                <Right />
            </button> */}
            <button
                onClick={() => router.push("/menu")}
                className="bg-primary flex justify-center items-center gap-2 text-white px-4 py-2 rounded-full uppercase"
                >
                Order Now
               <Right />
            </button>
            <button className='flex border-0 items-center gap-2 py-2 text-gray-600 font-semibold '
                onClick={() => router.push("/#about")}>
                Learn More
                <Right />
            </button>
           </div>
        </div>
        <div className='relative hidden md:block'>
           <Image 
           src={'/pizza.jpg'} 
           fill 
           style={{ objectFit: 'contain'}} 
           alt={'pizza'} />
        </div>
      </section>  
    );
}