import {models, model, Schema} from "mongoose";

const CategorySchema = new Schema({
    name: {type: String, required: true}, //String,

}, {timestamps: true});


export const Category = models?.Category || model('Category', CategorySchema);