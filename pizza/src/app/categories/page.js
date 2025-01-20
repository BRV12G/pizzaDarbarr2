"use client";
import AdminTabs from "@/components/layout/AdminTabs";
import { useProfile } from "@/components/useProfile";
import { set } from "mongoose";
import { useEffect } from "react";
import { useState } from "react";
import {toast} from "react-hot-toast";

export default function CategoriesPage() {
   
    const [categoryName, setCategoryName] = useState('');
    const {loading:profileLoading, data:profileData} = useProfile();
    const [categories, setCategories] = useState([]);
    const [editedCategory , setEditedCategory] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    function fetchCategories() {
        fetch('/api/categories').then(res => {
            res.json().then(categories => {
             setCategories(categories);
            });
          });
    }
    
    async function handleCategory(ev) {
        ev.preventDefault();
        const creationPromise = new Promise(async (resolve, reject) => {
            const data = {name: categoryName};
            if(editedCategory) {
                data._id = editedCategory._id;
            }
            const response = await fetch("/api/categories", {
                method: editedCategory ? 'PUT' : 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data),
            });
            setCategoryName('');
            fetchCategories();
            setEditedCategory(null);
            if(response.ok) 
                resolve();
            else 
                reject();
        });
        await toast.promise(creationPromise, {
            loading: editedCategory
             ? 'Updating Category...'
             : 'Creating Category...',
            success: editedCategory 
            ? 'Category Updated Successfully...' 
            : 'Category Created Successfully!',
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
            <form className="mt-8" onSubmit={handleCategory}>
                 <div className="flex gap-2 items-end">
                    <div className="grow">
                        <label>
                            {editedCategory ? "Update Category" : "New Category name"}
                            {editedCategory && (
                                <>: <b>{editedCategory.name}</b></>
                            )}
                        </label>
                        <input type="text" placeholder="Category Name" value={categoryName} onChange={ev => setCategoryName(ev.target.value)}/>
                    </div>
                    <div className="pb-2">
                        <button className="" type="submit">
                            {editedCategory ? 'Update' : 'Create'}
                        </button>
                    </div>
                 </div>
               
         
            </form>
            <div>
               <h2 className="mt-8 text-sm text-gray-500">Edit Categories</h2>
               {categories?.length > 0 && categories.map(c => (
                <button 
                    onClick={() => {
                        setEditedCategory(c);
                        setCategoryName(c.name);
                    }}
                    className=" rounded-xl p-2 px-4 flex gap-2 mb-1 cursor-pointer">
                    <span>{c.name}</span>
                </button>
               ))}
            </div>
        </section>
    );
}