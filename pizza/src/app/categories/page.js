"use client";
import DeleteButton from "@/components/DeleteButton";
import AdminTabs from "@/components/layout/AdminTabs";
import { useProfile } from "@/components/UseProfile";
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

    async function handleDeleteClick(_id) {
         const promise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/categories?_id='+_id, {
                method: 'DELETE',
             });
             if (response.ok) {
                resolve();
             } else {
                reject();
             }
         });
         

         await toast.promise(promise, {
            loading: 'Deleting Category...',
            success: 'Category Deleted!',
            error: "Error!",
         });

         fetchCategories();

    }

    if (profileLoading) {
        return 'Loading Admin Info...';
    }

    if(!profileData.admin) {
        return 'Not Admin!';
    }
    return (
        <section className="mt-8 max-w-2xl mx-auto">
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
                    <div className="pb-2 flex gap-2">
                        <button className="" type="submit">
                            {editedCategory ? 'Update' : 'Create'}
                        </button>
                        <button type="button" onClick={() => {setEditedCategory(null); setCategoryName('')}}>Cancel</button>
                    </div>
                 </div>
               
         
            </form>
            <div>
               <h2 className="mt-8 text-sm text-gray-500">Existing Categories</h2>
               {categories?.length > 0 && categories.map(c => (
                <div key={c._id}
                    className="bg-gray-100 rounded-xl p-2 px-4 flex gap-2 mb-1 items-center">
                    <div className="grow" >{c.name}</div>
                    <div className="flex gap-1">
                        <button type="button" onClick={() => {
                            setEditedCategory(c);
                            setCategoryName(c.name);
                            }}>Edit
                        </button>
                        {/* <button onClick={() => handleDeleteClick(c._id)} type="button">Delete</button> */}
                        <DeleteButton label="Delete" onDelete={() => handleDeleteClick(c._id)} />
                    </div>
                </div>
               ))}
            </div>
        </section>
    );
}