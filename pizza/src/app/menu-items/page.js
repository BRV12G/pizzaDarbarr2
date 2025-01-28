// "use client";

// import AdminTabs from "@/components/layout/AdminTabs";
// // import EditableImage from "@/components/layout/EditableImage";
// import { useProfile } from "@/components/useProfile";
// import { useState } from "react";
// import toast from "react-hot-toast";

// export default function MenuItemsPage() {

//    const [image , setImage] = useState(null); //
//    const {loading, data} = useProfile();
//    const [name, setName] = useState('');
//    const [description, setDescription] = useState('');
//    const [basePrice, setBasePrice] = useState('');

//    async function handleFormSubmit(ev) {
//     ev.preventDefault();
//     const data = { image, name, description, basePrice}
//     const savingPromise = new Promise( async (resolve, reject) => {
//         const response = await fetch('/api/menu-items', {
//             method: 'POST',
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify(data)
//         });
//         if(response.ok){
//             resolve();
//         }
//         else{
//             reject();
//         }
//     });

//     await toast.promise(savingPromise, {
//         loading: 'Saving Menu Item...',
//         success: 'Menu Item Saved Successfully!',
//         error: 'Error Saving Menu Item'
//     });
    

//    }

//    if(loading){
//     return 'Loading Admin Info...';
//    }

//    if(!data?.admin){
//     return 'You are not an admin!';
//    }

//    return (
//     <section className="mt-8">
//        <AdminTabs isAdmin={true}/>
//        <form onSubmit={handleFormSubmit} className="mt-8 max-w-md mx-auto">
//         <div className="flex gap-4 items-start">
//             <div>
//                 <label>Image</label>
//                 <input type="file" placeholder="Image-food" value={image} onChange={ev => setImage(ev.target.value)}/>
//                 {/* <EditableImage link={image} setLink={setImage}/> */}
//             </div>
//             <div className="grow">
//                 <label>Item Name</label>
//                 <input type="text" placeholder="Menu Item Name" value={name} onChange={ev => setName(ev.target.value)} />
//                 <label>Description</label>
//                 <input type="text" placeholder="Menu Item Name" value={description} onChange={ev => setDescription(ev.target.value)}/>
//                 <label>Base Prices</label>
//                 <input type="text" placeholder="Menu Item Name" value={basePrice} onChange={ev => setBasePrice(ev.target.value)}/>
//                 <button type="submit">Save</button>
//             </div>
//         </div>
//        </form>
//     </section>

//    );
// }





"use client";

import { useProfile } from "@/components/UseProfile";
import AdminTabs from "@/components/layout/AdminTabs";
import Link from "next/link";
import Right from "@/components/icons/right";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function MenuItemsPage() {
  
  const { loading, data } = useProfile();
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch("/api/menu-items").then(res => {
        res.json().then(menuItems => {
            setMenuItems(menuItems);
        });
    })
  }, []);
  
  if (loading) {
    return "Loading Admin Info...";
  }

  if (!data?.admin) {
    return "You are not an admin!";
  }

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <AdminTabs isAdmin={true} />
       <div className="mt-8">
           <Link className="button" href={"/menu-items/new"}>
               <span>Create New Menu Item </span> <Right />
            </Link>
        </div>
        <div>
            <h2 className="text-sm text-gray-500 mt-8">Edit Menu Items</h2>
            <div className="grid grid-cols-3 gap-2">
            {menuItems?.length > 0 && menuItems.map(item => (
                <Link key={item._id} href={'/menu-items/edit/'+item._id} className = "bg-gray-200 rounded-lg p-4">
                    <div className="relative">
                        <Image src={`data:image/png;base64,${item.image}`} alt={''} c width={200} height={200} className="rounded-lg"/>
                    </div>
                    <div className="text-center">{item.name}</div>
                </Link>
            ))}

            </div>
            
        </div>

    </section>
  );
}







