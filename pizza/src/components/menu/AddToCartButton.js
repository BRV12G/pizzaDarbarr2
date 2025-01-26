
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
                Add to cart ${basePrice}
              </div>
            </FlyingButton>
          </div>
        );
      }

    // if (hasSizeOrExtras) {
    //     return (
    //     <div>
    //         <div className="flying-button-parent mt-4">
    //             <FlyingButton
    //             targetTop={'5%'}
    //             targetLeft={'95%'}
    //             src={imageSrc}>
    //             <div onClick={onClick}>
    //                 Add to cart (from Rs.{basePrice})
    //             </div>
    //             </FlyingButton>
    //         </div>
    //     </div>
    // )} 
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