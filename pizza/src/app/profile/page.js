"use client";
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useState, useEffect } from "react";
import AdminTabs from '@/components/layout/AdminTabs';
import UserForm from '@/components/layout/UserForm';
import toast from "react-hot-toast";

export default function Profilepage() {
    const session = useSession();
    const {status} = session;
    console.log(session);
   
    const [user, setUser] = useState(null)
    const [isAdmin, setIsAdmin] = useState(false);
    const [profileFetched, setProfileFetched] = useState(false);




    useEffect(() => {
        if(status === 'authenticated'){
            fetch('/api/profile' ).then(response => {
                response.json().then(data =>{
                    console.log(data);
                    setUser(data);
                    setIsAdmin(data.admin);
                    setProfileFetched(true);
                })
            });
        }
    }, [session, status]);
    async function handleProfileInfoUpdate(ev, data) {
        ev.preventDefault();
        // console.log(userName);
        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/profile', {
              method: 'PUT',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify(data),
            });
            if (response.ok)
              resolve()
            else
              reject();
          });
      
          await toast.promise(savingPromise, {
            loading: 'Saving...',
            success: 'Profile saved!',
            error: 'Error',
          });
    }


    
   


    if (status === 'loading'|| !profileFetched){
        return 'loading...';
    }

    if (status === 'unauthenticated'){
       return redirect('/login');
    }

    const userImage = session.data.user.image;
    return (
        <section className="mt-8">
            <AdminTabs isAdmin={isAdmin} />
            <div className='max-w-2xl mx-auto mt-8'>
            
                <UserForm user={user} onSave={handleProfileInfoUpdate}/>

            </div>
        </section>
    );
}