import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import {User} from "@/models/User";
export async function PUT (req) {
    mongoose.connect(process.env.MONGO_URL);
    const data = await req.json();
    const session = await getServerSession(authOptions);
    const email = session.user.email;
    console.log({session, data});

    // const user = await User.findOne({email});

    // if('name' in data) {
    //     //update user name
    //     await User.updateOne({email},{name: data.name});
    //     // const user = await User.findOne({email});
    //     // user.name = data.name;
    //     // await user.save();
    //     // console.log({email,data});

    // }
    // if('city' in data) {

    // }
    
    await User.updateOne({email}, data);
    return Response.json(session);
}

export async function GET (req) {
    mongoose.connect(process.env.MONGO_URL);
    const session = await getServerSession(authOptions);
    const email = session.user.email;
    return Response.json(
        await User.findOne({email})
    );
}