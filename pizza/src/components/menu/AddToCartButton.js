
// @ts-ignore
import FlyingButton from 'react-flying-item';

export default function AddToCartButton({hasSizeOrExtras, onClick, basePrice,image}) {
    const imageSrc = `data:image/png;base64,${image}`;

    if (!hasSizeOrExtras) {
        return (
          <div className="flying-button-parent mt-4">
            <FlyingButton
              targetTop={'5%'}
              targetLeft={'95%'}
              src={imageSrc}>
              <div onClick={onClick}>
                Add to cart Rs.{basePrice}
              </div>
            </FlyingButton>
          </div>
        );
      }

   
    return (
        <button 
           type="button"
           onClick={onClick}
           className='bg-primary text-white  px-8 py-2 rounded-full mt-4'> 
           { hasSizeOrExtras && (
            <span className='text-sm'>Add to Cart (from Rs.{basePrice})</span>
           )}
        </button>
    );
}







// import { motion } from "framer-motion";
// import { useState } from "react";

// export default function AddToCartButton({ hasSizeOrExtras, onClick, basePrice, image }) {
//   const imageSrc = `data:image/png;base64,${image}`;
//   const [isFlying, setIsFlying] = useState(false);
//   const [flyStyle, setFlyStyle] = useState({ x: 0, y: 0 });

//   const handleFlyingClick = (e) => {
//     // Calculate flight path
//     const buttonRect = e.target.getBoundingClientRect();
//     const cartPosition = { x: window.innerWidth - 80, y: 20 }; // Adjust to match cart position

//     setFlyStyle({
//       x: cartPosition.x - buttonRect.left - 30,
//       y: cartPosition.y - buttonRect.top - 30,
//     });

//     // Trigger flying animation
//     setIsFlying(true);

//     // Simulate adding to cart
//     setTimeout(() => {
//       setIsFlying(false);
//       onClick(); // Trigger any custom functionality
//     }, 1000); // Matches animation duration
//   };

//   if (!hasSizeOrExtras) {
//     return (
//       <div className="relative mt-4">
//         {/* Flying image */}
//         {isFlying && (
//           <motion.img
//             src={imageSrc}
//             alt="Flying Item"
//             className="absolute w-16 h-16 z-50"
//             initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
//             animate={{
//               x: flyStyle.x,
//               y: flyStyle.y,
//               scale: 0.2,
//               opacity: 0.5,
//             }}
//             transition={{ duration: 1, ease: "easeInOut" }}
//             onAnimationComplete={() => setIsFlying(false)} // Reset animation state
//           />
//         )}

//         {/* Flying Button */}
//         <motion.div
//           className="bg-primary text-white px-8 py-2 rounded-full cursor-pointer font-semibold"
//           // whileHover={{ scale: 1.1 }}
//           // whileTap={{ scale: 0.95 }}
//           onClick={handleFlyingClick}
//         >
//           Add to cart Rs.{basePrice}
//         </motion.div>
//       </div>
//     );
//   } 

//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       className="bg-primary text-white px-8 py-2 rounded-full mt-4"
//     >
//       {hasSizeOrExtras && (
//         <span className="text-sm">Add to Cart (from Rs.{basePrice})</span>
//       )}
//     </button>
//   );
// }










