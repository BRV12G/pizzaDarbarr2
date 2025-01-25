"use client"
import { useState } from "react";
import Image from "next/image";
import { useProfile } from "@/components/useProfile";

export default function UserForm({user, onSave}) {
        const [userName , setUsername] = useState( user?.name ||' ');
        const [image, setImage] = useState(user?.image || '');
        const [phone , setPhone] = useState(user?.phone ||' ');
        const [streetAddress , setStreetAddress] = useState(user?.streetAddress ||' ');
        const [postalCode , setPostalCode] = useState(user?.postalCode ||' ');
        const [city , setCity] = useState(user?.city ||' ');
        const [country , setCountry] = useState(user?.country ||' ');
        const [admin, setAdmin] = useState(user?.admin || false);
        const {data:loggedInUserData} = useProfile();

        async function handleFileChange(ev){
                const files = ev.targetfiles;
                if(files?.length === 1){
                    const data = new FormData();
                    data.set('file', files[0]);
                    await fetch('/api/upload', {
                      method: 'POST', 
                      body: data,
                    //   headers: {'Content-Type': 'multipart/form-data'}  
                    });
                }
            }
    
    return (

        
        <div className='flex gap-4'>
                    <div>                    
                       <div className='p-2 rounded-lg relative'>
                              <Image className ="rounded-full w-full h-full mb-2" src={image} width={250} height={250} alt="avatar" />
                              <label>
                                <input type="file" className='hidden'></input>
                                <span className='block border border-gray-300 rounded-lg p-2 cursor-pointer'>Edit</span>
                                </label>
                        </div>
                    </div>
                    <form className='grow' onSubmit={ev =>onSave(ev, {name:userName, image, phone,admin, streetAddress, city, country, postalCode,})}>
                        <label>First and Last Name</label>
                        <input type="text" placeholder="First and Last Name" value={userName} onChange={ev => setUsername(ev.target.value)}/>
                        <label>Email</label>
                        <input type="email" value={user.email} disabled={true} placeholder={"email"}/>
                        <label>Phone</label>
                        <input type="tel" placeholder="Phone Number" value={phone} onChange={ev => setPhone(ev.target.value)} />
                        <label>Street Address</label>
                        <input type="text" placeholder="Street Address" value={streetAddress} onChange={ev => setStreetAddress(ev.target.value)} />
                        <div className='grid grid-cols-2 gap-2'>
                           <div>
                              <label>Postal Code</label>
                              <input  type="text" placeholder="Postal Code" value={postalCode} onChange={ev => setPostalCode(ev.target.value)} />
                            </div>
                           <div>
                               <label>City</label>
                               <input type="text" placeholder="City" value={city} onChange={ev => setCity(ev.target.value)} />
                            </div>   
                        </div>
                        <label>Country</label>
                        <input type="text" placeholder="Country" value={country} onChange={ev => setCountry(ev.target.value)} />
                        {loggedInUserData.admin && (
                            <div className="">
                               <label className="p-2  inline-flex gap-1  items-center mb-2" htmlFor="adminCb">
                                  <input 
                                    id="adminCb" type="checkbox" className="mr-2" value={'1'} checked={admin} onClick={ev => setAdmin(ev.target.checked)}></input>
                                    <span>Admin</span>
                               </label>
                            </div>
                        )}
                        
                        <button type='submit'>Save</button>
                    </form>

                </div>
    );
}