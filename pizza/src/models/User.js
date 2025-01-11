import {models, model, Schema} from "mongoose";
// import { unique } from "next/dist/build/utils";
import bcrypt from 'bcrypt';


const UserSchema = new Schema({
    email: {type: String, required:true, unique: true},
    password: { 
        type: String, 
        required: true,
        validate: pass => {
         if(!pass?.length || pass.length < 6) {
            new Error('password must be atleast 6 characters');
            return false;
         }

        },
    },
}, {timestamps: true});  

UserSchema.post('validate', function (user) {
    const notHashedpass = user.password;
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(notHashedpass, salt);
})

export const User = models?.User || model('User', UserSchema);
