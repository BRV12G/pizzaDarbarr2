export default function MenuItemTile({onAddToCart, ...item}) {
    const {image, name, description, basePrice, sizes, extraIngredientPrices} = item;
    const imageSrc = `data:image/png;base64,${image}`;

    return (
        <div className='bg-gray-200 p-4 rounded-lg text-center group hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all'>
        <div className="text-center">
           <img src={imageSrc}  alt="pizza1" className="max-h-auto max-h-24 block mx-auto" />
        </div>
        <h4 className='text-xl font-semibold my-3'>{name}</h4>
        <p className='text-gray-500 text-sm  line-clamp-3'>{description}</p>
        <button 
           type="button"
           onClick={onAddToCart}
           className='bg-primary text-white  px-8 py-2 rounded-full mt-4'> 
           { (sizes?.length > 0 || extraIngredientPrices?.length > 0) ? (
            <span>Add to Cart (from Rs.{basePrice})</span>
           ) : (
            <span>Add to Cart Rs.{basePrice}</span>
           )}
        </button>
     </div>
    );
}


