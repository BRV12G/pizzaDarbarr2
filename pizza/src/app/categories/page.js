"use client";
import AdminTabs from "@/components/layout/AdminTabs";
import { useProfile } from "@/components/useProfile";
import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function CategoriesPage() {
   
    const [newCategoryName, setNewCategoryName] = useState('');
    const {loading:profileLoading, data:profileData} = useProfile();
    
    async function handleNewCategory(ev) {
        ev.preventDefault();
        const creationPromise = new Promise(async(resolve, reject) =>{
            const response = await fetch("/api/categories", {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({name: newCategoryName}),
            });
            if(response.ok) 
                resolve()
            else 
                reject();
        });
        toast.promise(creationPromise, {
            loading: 'Creating Category...',
            success: 'Category Created Successfully!',
            error: 'Error Creating Category'
        });
        
    }

    if (profileLoading) {
        return 'Loading Admin Info...';
    }

    if(!profileData.admin) {
        return 'Not Admin!';
    }
    return (
        <section className="mt-8 max-w-md mx-auto">
            <AdminTabs isAdmin = {true} />
            <form className="mt-8" onSubmit={handleNewCategory}>
                 <div className="flex gap-2 items-end">
                    <div className="grow">
                        <label>New Category Name</label>
                        <input type="text" placeholder="Category Name" value={newCategoryName} onChange={ev => setNewCategoryName(ev.target.value)}/>
                    </div>
                    <div className="pb-2">
                        <button className="" type="submit">Create</button>
                    </div>
                 </div>
               
         
            </form>
        </section>
    );
}