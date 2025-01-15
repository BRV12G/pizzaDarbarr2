import mongoose from "mongoose";
// import {User} from "@/models/User"; 
import {User} from "./../../../models/User";
import bcrypt from 'bcrypt';
//  Ensure the correct path to your model


export  async function POST(req) {
    // saving user to database
    //connecting to mongodb
    const body = await req.json();
    mongoose.connect(process.env.MONGO_URL);
    const pass = body.password;
         if(!pass?.length || pass.length < 6) {
            new Error('password must be atleast 6 characters');
            // return false;
         }

    

    const notHashedpass = pass;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(notHashedpass, salt);

    body.password = hashedPassword;
    //creating a new user object
    const createdUser = await User.create(body)
    return Response.json(createdUser);
}