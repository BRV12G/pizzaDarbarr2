// import { useEffect, useState } from "react";

// export default function SavedMenuItems() {
//   const [menuItems, setMenuItems] = useState([]);

//   useEffect(() => {
//     async function fetchMenuItems() {
//       const response = await fetch("/api/menu-items");
//       if (response.ok) {
//         const data = await response.json();
//         setMenuItems(data);
//       }
//     }

//     fetchMenuItems();
//   }, []);

//   return (
//     <div className="menu-items-list mt-8">
//       {menuItems.map((item) => (
//         <div key={item._id} className="menu-item-card border p-4 mb-4">
//           {item.image && (
//             <img
//               src={item.image}
//               alt={item.name}
//               className="w-full h-64 object-cover mb-4"
//             />
//           )}
//           <h3 className="text-lg font-bold">{item.name}</h3>
//           <p>{item.description}</p>
//           <p className="text-gray-500">Base Price: ${item.basePrice}</p>
//         </div>
//       ))}
//     </div>
//   );
// }
