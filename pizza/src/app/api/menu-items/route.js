// import { MenuItem } from '@/models/MenuItem';

// export async function POST(req) {
//     mongoose.connect(process.env.MONGO_URL);
//     const data = await req.json();
//     const menuItemsDoc = await MenuItem.create(data);
//     return Response.json(menuItemsDoc);
// }



import { MenuItem } from "@/models/MenuItem";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import multer from "multer";
import { Readable } from "stream";

// Configure multer for image uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

export const POST = async (req) => {
  await mongoose.connect(process.env.MONGO_URL);

  try {
    const formData = await req.formData();
    const image = formData.get("image");
    const name = formData.get("name");
    const description = formData.get("description");
    const basePrice = parseFloat(formData.get("basePrice"));

    if (!image || !name || !description || !basePrice) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const imageBuffer = Buffer.from(await image.arrayBuffer());

    const menuItem = await MenuItem.create({
      image: imageBuffer,
      name,
      description,
      basePrice,
    });

    return NextResponse.json(menuItem);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error saving menu item", error: error.message },
      { status: 500 }
    );
  }
};


// export async function PUT(req) {
//   mongoose.connect(process.env.MONGO_URL);
//   const { _id, ...data} = await req.json();
//   await MenuItem.findByIdAndUpdate(_id, data);
//   return Response.json(true);
// }


export const PUT = async (req) => {
  await mongoose.connect(process.env.MONGO_URL);

  const formData = await req.formData();
  const _id = formData.get("_id"); // Extract item ID
  const name = formData.get("name");
  const description = formData.get("description");
  const basePrice = parseFloat(formData.get("basePrice"));
  const image = formData.get("image"); // Extract image

  const updateData = { name, description, basePrice };

  if (image) {
    const imageBuffer = Buffer.from(await image.arrayBuffer());
    updateData.image = imageBuffer; // Add the image if provided
  }

  try {
    await MenuItem.findByIdAndUpdate(_id, updateData);
    return NextResponse.json(true);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error updating menu item", error: error.message },
      { status: 500 }
    );
  }
};



export async function GET() {
  mongoose.connect(process.env.MONGO_URL);
  return Response.json(
    await MenuItem.find().lean()
  );
}






