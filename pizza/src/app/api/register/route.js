import mongoose from "mongoose";
import {User} from "@/app/models/User"; // Ensure the correct path to your model


export  async function POST(req) {
    // saving user to database

    //connecting to mongodb
    const body = await req.json();
    mongoose.connect(process.env.MONGO_URL);
    //creating a new user object
    const createdUser = await User.create(body)
    return Response.json(createdUser);
}