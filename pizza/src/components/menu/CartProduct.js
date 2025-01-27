import Image from "next/image";
import Trash  from "@/components/icons/Trash";
import { cartProductPrice } from "@/components/AppContext";

export default function CartProduct({product, onRemove}) {
    return (
        <div key={product._id} className="flex gap-4 mb-2 items-center border-b py-2">
                        {/* <div>
                            <Image src={product.image} alt= {''} width={240} height={240}/>
                        </div>  */}
                        <div className="mb-4 w-24">
                                    {product.image ? (
                                        <Image
                                            src={`data:image/png;base64,${product.image}`} // Use base64 string as src
                                            alt={product.name || "Product Image"}
                                            width={200}
                                            height={200}
                                        />
                                    ) : (
                                        <div className="text-gray-500">
                                            No Image Available
                                        </div>
                                    )}
                        </div>
                        <div className="grow">
                            <h3 className="text-lg font-bold">{product.name}</h3>
                            {product.size && (
                                <div className="text-sm">
                                    Size: 
                                    <span>{product.size.name}</span>
                                </div>
                            )}
                            {product.extras?.length > 0 && (
                                <div className="text-sm text-gray-500">
                                    {product.extras.map(extra => (
                                        <div key={extra.name}>
                                            <span>{extra.name} Rs{extra.price}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className=" text-lg font-semibold">
                           Rs.{cartProductPrice(product)}
                        </div>
                        {!!onRemove && (
                          <div className="ml-4">
                              <button type="button" onClick={() => onRemove(index)} className="p-2"> <Trash /> </button>
                          </div>  
                        )}
                        
                    </div>
    );
}