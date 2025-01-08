export default function MenuItems() {
    return (
        <div className='bg-gray-200 p-4 rounded-lg text-center group hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all'>
            <div className="text-center">
               <img src="/pizza.jpg"  alt="pizza1" className="max-h-auto max-h-24 block mx-auto" />
            </div>
            <h4 className='text-xl font-semibold my-3'>Pepperoni Pizza</h4>
            <p className='text-gray-500 text-sm'>lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
            <button className='bg-primary text-white  px-8 py-2 rounded-full mt-4'> Add to Cart Rs 500</button>
         </div>

    );
}