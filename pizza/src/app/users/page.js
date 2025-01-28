"use client"

import AdminTabs from "@/components/layout/AdminTabs";
import { useProfile } from "@/components/UseProfile";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const {loading, data} = useProfile();

    useEffect(() => {
        fetch("/api/users").then(response => {
            response.json().then(users => {
                setUsers(users); 
            });
        })
    }, []);

    if(loading) {
        return 'Loading User Info...';
    }

    if(!data.admin) {
        return "Not an Admin!";
    }
    return (
        <section className="max-w-2xl mx-auto mt-8">
            <AdminTabs isAdmin={true} />
            <div className="mt-8">
                {users?.length > 0 && users.map(user => (
                    <div key={user._id} className="bg-gray-100 rounded-lg mb-2 p-1 flex px-4 items-center gap-4 md:flex-row">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 grow">
                        <div className="text-gray-700">
                            {!!user.name && (<span>{user.name}</span>)}
                            {!user.name && (<span className="italic">No Name</span>)}
                        </div>   
                        <span className="text-gray-400 ">{user.email}</span>
                        </div>
                        <div>
                            <Link className="button" href={'/users/'+user._id}>Edit</Link>
                        </div>
                        
                    </div>
                )) }
            </div>
        </section>
    );
}