"use client";
import SectionHeaders from "@/components/layout/SectionHeaders";
import {useContext, useEffect} from 'react';
import { CartContext, cartProductPrice } from "@/components/AppContext";
import Image from "next/image";
import Trash from "@/components/icons/Trash";
import AddressInputs from "@/components/layout/AddressInputs";
import { useState } from "react";
import { useProfile } from "@/components/UseProfile";
import toast from "react-hot-toast";
import CartProduct from "@/components/menu/CartProduct";
// import {createContext} from "react";


export default function CartPage() {
    const {cartProducts, removeCartProduct} = useContext(CartContext);
    const [address, setAddress] = useState({});
    const {data:profileData} = useProfile();
    console.log(profileData);

    useEffect(() => {
        if (typeof window !== 'undefined') {
          if (window.location.href.includes('canceled=1')) {
            toast.error('Payment failed 😔');
          }
        }
      }, []);

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
    
    async function proceedToCheckout(ev) {
        //redirect to stripe checkout
        ev.preventDefault();
        const promise = new Promise ((resolve, reject) => {
            fetch('/api/checkout', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    address,
                    cartProducts,
                })
            }).then(async (response) => {
                if(response.ok) {
                    resolve();
                    const link = await response.json();
                    console.log(link);
                     window.location = link;
                } else {
                    reject();
                }
                
            });
        });

       await toast.promise(promise, {
            loading: 'Preparing Checkout...',
            success: 'Redirect complete!',
            error: 'Redirect error!',
        })
        
        
    }

    // console.log({cartProducts});
    if (cartProducts?.length === 0) {
        return (
          <section className="mt-8 text-center">
            <SectionHeaders mainHeader="Cart" />
            <p className="mt-4">Your shopping cart is empty 😔</p>
          </section>
        );
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
                    <CartProduct key ={index} product={product}  onRemove={removeCartProduct} index={index}/>
                 ))}
                 <div className="py-4  pr-16 flex justify-end items-center">
                    <div className="text-gray-500">
                        SubTotal: <br />
                        Delivery: <br />
                        Total:
                    </div>
                    <div className="font-semibold  pl-2 flex items-center">
                        Rs.{cartProducts?.reduce((acc, product) => acc + cartProductPrice(product), 0)}
                        <br />
                        Rs.50
                        <br />
                        Rs.{cartProducts?.reduce((acc, product) => acc + cartProductPrice(product), 0)+50}
                    </div>
                 </div>
              </div>
              <div className="bg-gray-200 p-4 rounded-lg">
                <h2>Checkout</h2>
                <form onSubmit={proceedToCheckout}>
                    <AddressInputs addressProps={address} setAddressProps={handleAddressChange}/>
                    <button type="submit">Pay Rs.{cartProducts?.reduce((acc, product) => acc + cartProductPrice(product), 0)+50} </button>
                </form>
              </div>
          </div>
        </section>
    );
}