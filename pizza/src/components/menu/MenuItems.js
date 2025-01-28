import { useContext } from "react";
import { CartContext } from "../AppContext";
import toast from "react-hot-toast";
import { useState } from "react";
import MenuItemTile from "./MenuItemTile";
import Image from "next/image";
import FlyingButton from "react-flying-item";

export default function MenuItems(menuItem) { 
    const {image, name, description, basePrice, sizes, extraIngredientPrices,} = menuItem;
    const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null);
    const [selectedExtras, setSelectedExtras] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const imageSrc = `data:image/png;base64,${image}`;


    const {addToCart} = useContext(CartContext); 
    async function handleAddToCartButtonClick() {
    

        const hasOptions = sizes.length > 0 || extraIngredientPrices.length > 0;
        if(hasOptions && !showPopup) {
            setShowPopup(true);
            return;
        }


        addToCart(menuItem, selectedSize, selectedExtras);
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('hiding popup');
        setShowPopup(false);
        toast.success("Added to Cart!");

        
    }

    function handleExtraThingClick(ev, extraThing) {
       const checked = ev.target.checked;
       if(checked) {
           setSelectedExtras(prev => [...prev, extraThing]);
       } else {
        setSelectedExtras(prev => {
          return prev.filter(e => e.name !== extraThing.name);
        })
       }
    }
       
    let selectedPrice = basePrice;
    if (selectedSize) {
        selectedPrice += selectedSize.price;
    }
    if (selectedExtras.length > 0) {
        for (const extra of selectedExtras) {
            selectedPrice += extra.price;
        }
    }
    return (
    <>
        {showPopup && (
            <div
              onClick={() => setShowPopup(false)} 
              className="fixed inset-0  bg-black/80 flex items-center justify-center">
                <div
                  onClick={ev => ev.stopPropagation()} 
                  className="bg-white p-2 rounded-lg max-w-md ">
                    <div className=" overflow-y-scroll p-2" style={{maxHeight: 'calc(100vh - 100px)'}}>
                    <Image src={imageSrc} alt={name} width={300} height={200} className="mx-auto" />
                    <h2 className="text-lg font-bold text-center mb-2">{name}</h2>
                    <p className="text-center text-gray-500 text-sm mb-2">{description}</p>
                    {sizes?.length > 0 && (
                        <div className=" py-2">
                            <h3 className="text-center text-gray-700">Pick Your Size</h3>
                            {sizes.map (size => (
                                <label key = {size._id} className="flex  items-center p-4 gap-1 rounded-md mb-1 border">
                                    <input type="radio"
                                         onChange={() => setSelectedSize(size)}
                                         checked={selectedSize?.name === size.name}
                                         name="size" /> 
                                    {size.name} Rs.{basePrice + size.price}
                                </label>
                            ))}
                        </div>
                    )}
                    {extraIngredientPrices?.length > 0 && (
                        <div className="py-2"> 
                            <h3 className="text-center text-gray-700">Extras?</h3>
                            {extraIngredientPrices.map(extraThing => (
                                <label key={extraThing._id} className="flex  items-center p-4 gap-1 rounded-md mb-1 border">
                                    <input
                                        type="checkbox"
                                        onChange={ev => handleExtraThingClick(ev, extraThing )}
                                        checked={selectedExtras.map(e => e._id).includes(extraThing._id)} 
                                         name={extraThing.name} /> 
                                    {extraThing.name} +Rs.{extraThing.price}
                                </label>
                            ))}
                        </div>
                    )}

              <FlyingButton
                targetTop={'5%'}
                targetLeft={'95%'}
                src={imageSrc}>
                <div className="primary sticky bottom-2"
                     onClick={handleAddToCartButtonClick}>
                  Add to cart Rs.{selectedPrice}
                </div>
              </FlyingButton>
                    <button className=" mt-2" type="button" onClick={() => setShowPopup(false)}>Cancel</button>
                    </div>
                    
                </div>
            </div>
        )}
        <MenuItemTile onAddToCart={handleAddToCartButtonClick} {...menuItem} />
       
    </>
 );

}
