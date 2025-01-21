// export default function MenuItemForm({onSubmit, menuItem}) {
//         const [image, setImage] = useState(null);
//         const { loading, data } = useProfile();
//         const [name, setName] = useState("");
//         const [description, setDescription] = useState("");
//         const [basePrice, setBasePrice] = useState("");
//         const [imagePreview, setImagePreview] = useState(null); // Stores the preview URL 
         

//     return (
//         <form onSubmit={onSubmit} className="mt-8 max-w-md mx-auto">
//         <div className="flex gap-4 items-start ">
//            <div className="flex flex-col gap-4">
//                 <input id="fileInput" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
//                <div className="w-32 h-32 mt-4 border rounded-lg flex items-center justify-center ">
//                 {imagePreview ? (
//                     <img  src={imagePreview} alt="Selected Preview" className="w-32 h-32 mt-4 object-cover rounded-lg border" />
//                 ) : (
//                     <p className="text-sm text-gray-500">No image selected</p>
//                 )}
//                </div>
//                 <button  type="button" onClick={() => document.getElementById("fileInput").click()} className="btn-secondary"> {image ? "Edit Image" : "Upload Image"} </button>
//             </div>
//             <div className="grow">
//                <label>Item Name</label>
//                 <input type="text" placeholder="Menu Item Name" value={name} onChange={(ev) => setName(ev.target.value)} />
//                 <label>Description</label>
//                 <input type="text" placeholder="Menu Item Description"value={description} onChange={(ev) => setDescription(ev.target.value)} />
//                 <label>Base Price</label>
//                 <input type="number" placeholder="Base Price" value={basePrice} onChange={(ev) => setBasePrice(ev.target.value)} />
//                 <button type="submit" className="btn-primary mt-4">Save</button>
//             </div>
//         </div>
//       </form>
//     );

}