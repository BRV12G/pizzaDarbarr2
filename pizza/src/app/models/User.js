import {models, model, Schema} from "mongoose";
import { unique } from "next/dist/build/utils";


const UserSchema = new Schema({
    email: {type: String, required:true, unique: true},
    password: { 
        type: String, 
        required: true,
        validate: pass => {
         if(!pass?.length || pass.length < 6) {
            new Error('password must be atleast 6 characters');
         }

        },
    },
}, {timestamps: true});   

export const User = models?.User || model('User', UserSchema);
