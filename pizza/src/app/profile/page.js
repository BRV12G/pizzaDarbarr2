"use client";
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect } from "react";
export default function Profilepage() {
    const session = useSession();
    const {status} = session;
    console.log(session);
    const [userName , setUsername] = useState('');

    useEffect(() => {
        if(status === 'authenticated'){
            setUsername(session.data.user.name);
        }
    }, [status , session]);
    async function handleProfileInfoUpdate(ev) {
        ev.preventDefault();
        // console.log(userName);
        const response = await fetch('/api/profile', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name: userName})
        })
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
            <h1 className="text-4xl text-center text-primary mb-4">Profile</h1>
            <div className='max-w-md mx-auto'>
                <div className='flex gap-4 items-center'>
                    <div>                    
                       <div className='p-2 rounded-lg relative'>
                              <Image className ="rounded-full w-full h-full mb-2" src={userImage} width={250} height={250} alt="avatar"></Image>
                              <button type="button">Edit</button>
                        </div>
                    </div>
                    <form className='grow' onSubmit={handleProfileInfoUpdate}>
                        <input type="text" placeholder="First and Last Name" 
                        value={userName} onChange={ev => setUsername(ev.target.value)}/>
                        <input type="email" value={session.data.user.email} disabled={true}/>
                        <button type='submit'>Save</button>
                    </form>

                </div>

            </div>
        </section>
    );
}