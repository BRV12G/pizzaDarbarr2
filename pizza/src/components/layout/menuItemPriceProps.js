import Trash from "@/components/icons/Trash";
import Pluss from "@/components/icons/Pluss";
import CheveronDown from "../icons/CheveronDown";
import { useState } from "react";
import CheveronUp from "../icons/CheveronUp";

export default function MenuItemPriceProps({name,addLabel, props, setProps}) {

    // const [sizes, setSizes] = useState([]);
    const [isOpen , setIsOpen] = useState(false);


    function addProp() {
        // add a new size to the sizes array
        setProps(oldProps => {
          return [...(oldProps || []), { name: "", price: 0 }]
        });

    }

    function editProp(ev, index, prop){
      const newValue = ev.target.value;
      setProps(prevSizes => {
        const newSizes = [...prevSizes];
        newSizes[index][prop] = newValue;
        return newSizes;
      })
    }


    function removeProp(indexToRemove){
      setProps(prev => prev.filter((v, index) => index !== indexToRemove))
    }



    return (
        <div className="bg-gray-200 p-2 rounded-md mb-2">
                  <button 
                   onClick={() => setIsOpen(prev => !prev)}
                   type="button"
                   className="inline-flex p-1">
                       {isOpen && ( <CheveronUp /> )} 
                       {!isOpen && ( <CheveronDown /> )}
                       <span>{name}</span>
                       <span>({props?.length || 0})</span>
                  </button>
                  <div className={isOpen ? 'block' : 'hidden'}>
                    {props?.length > 0 && props.map((size, index) => (
                    <div key={index} className="flex gap-2 items-end">
                      <div>
                           <label>Name</label>
                           <input type="text" placeholder="Size Name" value ={size.name} onChange={ev => editProp(ev, index, 'name')}/>
                      </div>
                      <div>
                          <label>Extra Price</label>
                           <input type="text" placeholder="Extra Price" value = {size.price} onChange={ev => editProp(ev, index, 'price')}/>
                      </div>
                      <div>
                          <button type="button" className="bg-white mb-2 p-2" onClick ={() => removeProp(index)} > <Trash /> </button>
                      </div>
                    </div>
                     ))}
                   <button type="button"  onClick={addProp} className="bg-white"> <Pluss /> {addLabel}</button>

                 </div>
                  
                </div>

    );
}