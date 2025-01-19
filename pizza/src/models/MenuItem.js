// import {models, model, Schema} from "mongoose";

// const MenuItemSchema = new Schema({
//     image: {type: Buffer},
//     name: {type: String, required: true},
//     description: {type: String, required: true},
//     basePrice: {type: Number, required: true},

// }, {timestamps: true});

// export const MenuItem = models?.MenuItem || model('MenuItem', MenuItemSchema);




import { models, model, Schema } from "mongoose";

const MenuItemSchema = new Schema(
  {
    image: { type: Buffer, required: true }, // Save image as a buffer
    name: { type: String, required: true },
    description: { type: String, required: true },
    basePrice: { type: Number, required: true },
  },
  { timestamps: true }
);

export const MenuItem = models?.MenuItem || model("MenuItem", MenuItemSchema);
