"use client";

import AdminTabs from "@/components/layout/AdminTabs";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useProfile } from "@/components/UseProfile";
import Link from "next/link";
import Left from "@/components/icons/left";
import { redirect } from 'next/navigation';
import MenuItemPriceProps from "@/components/layout/menuItemPriceProps";



export default function NewMenuItemPage() {

    const [image, setImage] = useState(null);
    const { loading, data } = useProfile();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [basePrice, setBasePrice] = useState("");
    const [redirectToItems , setRedirectToItems] = useState(false);
    const [imagePreview, setImagePreview] = useState(null); // Stores the preview URL 
    const [sizes, setSizes] = useState([]);
    const [extraIngredientPrices, setExtraIngredientPrices] = useState([]);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('');


     

    const handleImageChange = (ev) => {
        const file = ev.target.files[0];
        if (file) {
          setImage(file);
    
          // Generate a preview URL using FileReader
          const reader = new FileReader();
          reader.onloadend = () => {
            setImagePreview(reader.result);
          };
          reader.readAsDataURL(file);
        }
      };
    
      async function handleFormSubmit(ev) {
        ev.preventDefault();
    
        const formData = new FormData();
        formData.append("image", image);
        formData.append("name", name);
        formData.append("description", description);
        formData.append("category", JSON.stringify(category));
        formData.append("basePrice", basePrice);
        // formData.append("sizes" , sizes);
        // formData.append('extraIngredientPrices', extraIngredientPrices);
        formData.append("sizes", JSON.stringify(sizes));
        formData.append("extraIngredientPrices", JSON.stringify(extraIngredientPrices));
    
        const savingPromise = new Promise(async (resolve, reject) => {
          try {
            const response = await fetch("/api/menu-items", {
              method: "POST",
              body: formData, // Send form data for proper image handling
            });
    
            if (response.ok) {
              resolve();
            } else {
              const errorData = await response.json();
              reject(new Error(errorData.message || "Error saving menu item"));
            }
          } catch (error) {
            reject(error);
          }
        });
    
        await toast.promise(savingPromise, {
          loading: "Saving Menu Item...",
          success: "Menu Item Saved Successfully!",
          error: "Error Saving Menu Item",
        });
        setRedirectToItems(true);

        // Reset the form after successful submission
        setImage(null);
        // setName("");
        // setDescription("");
        // setBasePrice("");

      }

      useEffect(() => {
        fetch('/api/categories').then(res => {
          res.json().then(categories => {
            setCategories(categories);
          });
        });
      }, []);

        if (redirectToItems) {
          return redirect ('/menu-items');
        }
    
       

    
    
      if(loading){
        return 'Loading Menu info...';
      }

      if(!data.admin){
        return 'You are not an admin!';
      }

     

    
    return (
    <section className="mt-8">
      <AdminTabs isAdmin={true} />
      <div className="max-w-2xl mx-auto mt-8">
        <Link href={'/menu-items'} className="button"> <Left /> <span>Show All Menu Items </span></Link>
      </div>
      <form onSubmit={handleFormSubmit} className="mt-8 max-w-2xl mx-auto">
        <div className="flex gap-4 items-start ">
           <div className="flex flex-col gap-4">
                <input id="fileInput" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
               <div className="w-32 h-32 mt-4 border rounded-lg flex items-center justify-center ">
                {imagePreview ? (
                    <img  src={imagePreview} alt="Selected Preview" className="w-32 h-32 mt-4 object-cover rounded-lg border" />
                ) : (
                    <p className="text-sm text-gray-500">No image selected</p>
                )}
               </div>
                <button  type="button" onClick={() => document.getElementById("fileInput").click()} className="btn-secondary"> {image ? "Edit Image" : "Upload Image"} </button>
            </div>
            <div className="grow">
               <label>Item Name</label>
                <input type="text" placeholder="Menu Item Name" value={name} onChange={(ev) => setName(ev.target.value)} />
                <label>Description</label>
                <input type="text" placeholder="Menu Item Description"value={description} onChange={(ev) => setDescription(ev.target.value)} />
                <label>Category</label>
                <select value={category} onChange={ev => setCategory(ev.target.value)}>
                  <option value="" disabled selected>Select a Category</option>
                  {categories?.length > 0 && categories.map(c => (
                    <option value={c._id}>{c.name}</option>
                  ))}
                </select>
                <label>Base Price</label>
                <input type="number" placeholder="Base Price" value={basePrice} onChange={(ev) => setBasePrice(ev.target.value)} />
                                <MenuItemPriceProps name ={'Sizes'} addLabel={'Add Item Size'} props={sizes} setProps={setSizes} />
                                <MenuItemPriceProps name ={'Extra Ingredient Prices'} addLabel={'Add Ingredient Prices'} props={extraIngredientPrices} setProps={setExtraIngredientPrices} />

                
                <button type="submit" className="btn-primary mt-4 mb-2">Save</button>

            </div>
        </div>
      </form>
    </section>
 );
}