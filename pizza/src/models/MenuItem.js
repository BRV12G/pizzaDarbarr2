// import {models, model, Schema} from "mongoose";

// const MenuItemSchema = new Schema({
//     image: {type: Buffer},
//     name: {type: String, required: true},
//     description: {type: String, required: true},
//     basePrice: {type: Number, required: true},

// }, {timestamps: true});

// export const MenuItem = models?.MenuItem || model('MenuItem', MenuItemSchema);

import { models, model, Schema } from "mongoose";
import mongoose from 'mongoose'; // For ES Modules


const ExtraPriceSchema = new Schema ({
  name: String,
  price: Number,
});



const MenuItemSchema = new Schema(
  {
    image: { type: Buffer, required: true }, // Save image as a buffer
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: {type: mongoose.Types.ObjectId},
    basePrice: { type: Number, required: true },
    sizes: {type: [ExtraPriceSchema]},
    extraIngredientPrices: {type: [ExtraPriceSchema]}
  },
  { timestamps: true }
);

export const MenuItem = models?.MenuItem || model("MenuItem", MenuItemSchema);
