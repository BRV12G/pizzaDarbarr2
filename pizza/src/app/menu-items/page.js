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

import { useProfile } from "@/components/useProfile";

export default function MenuItemsPage() {
  


  const { loading, data } = useProfile();
  
  if (loading) {
    return "Loading Admin Info...";
  }

  if (!data?.admin) {
    return "You are not an admin!";
  }

  return (
    <div>menu</div>
  );
}







