
import Image from 'next/image';
import Right from '@/components/icons/right.js'

export default function Hero() {
    return (
      <section className="grid grid-cols-[0.4fr_0.6fr]">
        <div className='py-12 '>
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
            <button className= 'bg-primary flex items-center gap-2 text-white px-4 py-2 rounded-full uppercase'>
                Order Now
                <Right />
            </button>
            <button className='flex items-center gap-2 py-2 text-gray-600 font-semibold '>
                Learn More
                <Right />
            </button>
           </div>
        </div>
        <div className='relative'>
           <Image src={'/pizza.jpg'} layout={'fill'} objectFit={'contain'} alt={'pizza'} />
        </div>
      </section>  
    );
}