"use client";
import SectionHeaders from "@/components/layout/SectionHeaders";
import {useContext, useEffect} from 'react';
import { CartContext, cartProductPrice } from "@/components/AppContext";
import Image from "next/image";
import Trash from "@/components/icons/Trash";
import AddressInputs from "@/components/layout/AddressInputs";
import { useState } from "react";
import { useProfile } from "@/components/useProfile";
import Link from "next/link";
import toast from "react-hot-toast";
// import {createContext} from "react";


export default function CartPage() {
    const {cartProducts, removeCartProduct} = useContext(CartContext);
    const [address, setAddress] = useState({});
    const {data:profileData} = useProfile();
    console.log(profileData);

    useEffect(() => {
        if(profileData?.city) {
            const {phone, streetAddress, city, postalCode, country} = profileData;
            const addressFromProfile = {phone, streetAddress, city, postalCode, country};
            setAddress(addressFromProfile);
        }
    }, [profileData]);

    function handleAddressChange(propName, value) {
        setAddress(prevAddress => ({...prevAddress, [propName]: value}));
        
    }
    return (
        <section className="mt-8">
        <div className="text-center mb-4">
            <SectionHeaders subHeader={'Check Out'} mainHeader={'Your Cart'} />
        </div>
          <div className="grid gap-8 grid-cols-2">
              <div>{cartProducts?.length === 0 && (
                <div> No Products In Your Cart</div>
                 )}
                 {cartProducts?.length > 0 && cartProducts.map((product, index) => (
                    <div key={product._id} className="flex gap-4 mb-2 items-center border-b py-2">
                        {/* <div>
                            <Image src={product.image} alt= {''} width={240} height={240}/>
                        </div>  */}
                        <div className="mb-4 w-24">
                                    {product.image ? (
                                        <Image
                                            src={`data:image/png;base64,${product.image}`} // Use base64 string as src
                                            alt={product.name || "Product Image"}
                                            width={200}
                                            height={200}
                                        />
                                    ) : (
                                        <div className="text-gray-500">
                                            No Image Available
                                        </div>
                                    )}
                        </div>
                        <div className="grow">
                            <h3 className="text-lg font-bold">{product.name}</h3>
                            {product.size && (
                                <div className="text-sm">
                                    Size: 
                                    <span>{product.size.name}</span>
                                </div>
                            )}
                            {product.extras?.length > 0 && (
                                <div className="text-sm text-gray-500">
                                    {product.extras.map(extra => (
                                        <div key={extra._id}>
                                            <span>{extra.name} Rs{extra.price}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className=" text-lg font-semibold">
                           Rs.{cartProductPrice(product)}
                        </div>
                        <div className="ml-4">
                            <button type="button" onClick={() => removeCartProduct(index)} className="p-2"> <Trash /> </button>
                        </div>
                    </div>
                 ))}
                 <div className="py-4 text-right pr-16">
                    <span className="text-gray-500">SubTotal: </span>
                    <span className="font-semibold text-lg pl-2">Rs.{cartProducts?.reduce((acc, product) => acc + cartProductPrice(product), 0)} </span>
                 </div>
              </div>
              <div className="bg-gray-200 p-4 rounded-lg">
                <h2>Checkout</h2>
                <form>
                    <AddressInputs addressProps={address} setAddressProps={handleAddressChange}/>
                    <button type="submit">Pay Rs.{cartProducts?.reduce((acc, product) => acc + cartProductPrice(product), 0)} </button>
                </form>
              </div>
          </div>
        </section>
    );
}