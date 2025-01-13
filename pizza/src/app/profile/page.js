"use client";
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Image from 'next/image';
export default function Profilepage() {
    const session = useSession();
    const {status} = session;
    console.log(session);


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
            <form className='max-w-md mx-auto'>
                <div className='flex gap-4 items-center'>
                    <div>                    
                       <div className='p-2 rounded-lg relative'>
                              <Image className ="rounded-full w-full h-full mb-2" src={userImage} width={250} height={250} alt="avatar"></Image>
                              <button type="button">Edit</button>
                        </div>
                    </div>
                    <div className='grow'>
                        <input type="text" placeholder="First and Last Name" />
                        <input type="email" value={session.data.user.email} disabled={true}/>
                        <button type='submit'>Save</button>
                    </div>

                </div>

            </form>
        </section>
    );
}