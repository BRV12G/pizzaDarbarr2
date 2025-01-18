import {models, model, Schema} from "mongoose";
// import { unique } from "next/dist/build/utils";
import bcrypt from 'bcrypt';


const UserSchema = new Schema({
    name: {type: String},
    email: {type: String, required:true, unique: true},
    password: {type: String},
    
}, {timestamps: true});  

// UserSchema.post('validate', function (user) {
//     const notHashedpass = user.password;
//     const salt = bcrypt.genSaltSync(10);
//     user.password = bcrypt.hashSync(notHashedpass, salt);
// })

export const User = models?.User || model('User', UserSchema);
