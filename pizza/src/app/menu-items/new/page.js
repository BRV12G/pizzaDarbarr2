"use client";

import AdminTabs from "@/components/layout/AdminTabs";
// import { useProfile } from "@/components/useProfile";
import { useState } from "react";
import toast from "react-hot-toast";
import { useProfile } from "@/components/useProfile";

export default function NewMenuItemPage() {

    const [image, setImage] = useState(null);
    const { loading, data } = useProfile();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [basePrice, setBasePrice] = useState("");
    const [imagePreview, setImagePreview] = useState(null); // Stores the preview URL 

     

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
        formData.append("basePrice", basePrice);
    
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
    
        // Reset the form after successful submission
        setImage(null);
        // setName("");
        // setDescription("");
        // setBasePrice("");
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
      <form onSubmit={handleFormSubmit} className="mt-8 max-w-md mx-auto">
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
                <label>Base Price</label>
                <input type="number" placeholder="Base Price" value={basePrice} onChange={(ev) => setBasePrice(ev.target.value)} />
                <button type="submit" className="btn-primary mt-4">Save</button>
            </div>
        </div>
      </form>
    </section>

      );
}