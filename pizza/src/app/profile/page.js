"use client";
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from "react";
import AdminTabs from '@/components/layout/AdminTabs';
export default function Profilepage() {
    const session = useSession();
    const {status} = session;
    console.log(session);

    const [userName , setUsername] = useState('');
    const [saved, setSaved] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [phone , setPhone] = useState('');
    const [streetAddress , setStreetAddress] = useState('');
    const [postalCode , setPostalCode] = useState('');
    const [city , setCity] = useState('');
    const [country , setCountry] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);




    useEffect(() => {
        if(status === 'authenticated'){
            setUsername(session.data.user.name);
            fetch('/api/profile' ).then(response => {
                response.json().then(data =>{
                    console.log(data);
                    setPhone(data.phone);
                    setStreetAddress(data.streetAddress);
                    setPostalCode(data.postalCode);
                    setCity(data.city);
                    setCountry(data.country);
                    setIsAdmin(data.admin);
                })
            });
        }
    }, [status , session]);
    async function handleProfileInfoUpdate(ev) {
        ev.preventDefault();
        // console.log(userName);
        setSaved(false);
        setIsSaving(true);
        const response = await fetch('/api/profile', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name: userName, streetAddress, phone, postalCode, city, country})
        })
        setIsSaving(false);
        if (response.ok){
            setSaved(true);
        }
    }


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
   


    if (status === 'loading'){
        return 'loading...';
    }

    if (status === 'unauthenticated'){
       return redirect('/login');
    }

    const userImage = session.data.user.image;
    return (
        <section className="mt-8">
            <AdminTabs isAdmin={isAdmin} />
            <div className='max-w-md mx-auto mt-8'>
            {saved && (
                <h2 className='text-center bg-green-100 rounded-lg border border-green-300 p-4'>
                    Profile Saved!
                </h2>)}
                {isSaving && (
                    <h2 className='text-center bg-blue-100 rounded-lg border border-blue-300 p-4'>
                        Saving...
                    </h2>
                )}
                <div className='flex gap-4'>
                    <div>                    
                       <div className='p-2 rounded-lg relative'>
                              <Image className ="rounded-full w-full h-full mb-2" src={userImage} width={250} height={250} alt="avatar"></Image>
                              <label>
                                <input type="file" className='hidden'onChange={handleFileChange}></input>
                                <span className='block border border-gray-300 rounded-lg p-2 cursor-pointer'>Edit</span>
                                </label>
                        </div>
                    </div>
                    <form className='grow' onSubmit={handleProfileInfoUpdate}>
                        <label>First and Last Name</label>
                        <input type="text" placeholder="First and Last Name" value={userName} onChange={ev => setUsername(ev.target.value)}/>
                        <label>Email</label>
                        <input type="email" value={session.data.user.email} disabled={true}/>
                        <label>Phone</label>
                        <input type="tel" placeholder="Phone Number" value={phone} onChange={ev => setPhone(ev.target.value)} />
                        <label>Street Address</label>
                        <input type="text" placeholder="Street Address" value={streetAddress} onChange={ev => setStreetAddress(ev.target.value)} />
                        <div className='flex gap-2'>
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
                        <button type='submit'>Save</button>
                    </form>

                </div>

            </div>
        </section>
    );
}