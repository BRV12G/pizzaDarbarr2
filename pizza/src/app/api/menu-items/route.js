// // import { MenuItem } from '@/models/MenuItem';

// // export async function POST(req) {
// //     mongoose.connect(process.env.MONGO_URL);
// //     const data = await req.json();
// //     const menuItemsDoc = await MenuItem.create(data);
// //     return Response.json(menuItemsDoc);
// // }



// import { MenuItem } from "@/models/MenuItem";
// import mongoose from "mongoose";
// import { NextResponse } from "next/server";
// import multer from "multer";
// import { Readable } from "stream";

// // Configure multer for image uploads
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// export const POST = async (req) => {
//   await mongoose.connect(process.env.MONGO_URL);

//   try {
//     const formData = await req.formData();
//     const image = formData.get("image");
//     const name = formData.get("name");
//     const description = formData.get("description");
//     const basePrice = parseFloat(formData.get("basePrice"));
//     const sizes = JSON.parse(formData.get("sizes"));
//     const extraIngredientPrices = JSON.parse(formData.get('extraIngredientPrices'));

//     if (!image || !name || !description || !basePrice) {
//       return NextResponse.json(
//         { message: "All fields are required" },
//         { status: 400 }
//       );
//     }

//     const imageBuffer = Buffer.from(await image.arrayBuffer());
  


//     const menuItem = await MenuItem.create({
//       image: imageBuffer,
//       name,
//       description,
//       basePrice,
//       sizes,
//       extraIngredientPrices,
//     });

//     return NextResponse.json(menuItem);
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { message: "Error saving menu item", error: error.message },
//       { status: 500 }
//     );
//   }
// };


// // export async function PUT(req) {
// //   mongoose.connect(process.env.MONGO_URL);
// //   const { _id, ...data} = await req.json();
// //   await MenuItem.findByIdAndUpdate(_id, data);
// //   return Response.json(true);
// // }


// export const PUT = async (req) => {
//   await mongoose.connect(process.env.MONGO_URL);

//   const formData = await req.formData();
//   const _id = formData.get("_id"); // Extract item ID
//   const name = formData.get("name");
//   const description = formData.get("description");
//   const basePrice = parseFloat(formData.get("basePrice"));
//   const image = formData.get("image"); // Extract image
//   const sizes = JSON.parse(formData.get("sizes"));
//   const extraIngredientPrices = JSON.parse(formData.get('extraIngredientPrices'));

//   const updateData = { name, description, basePrice, sizes, extraIngredientPrices };

//   if (image) {
//     const imageBuffer = Buffer.from(await image.arrayBuffer());
//     updateData.image = imageBuffer; // Add the image if provided
     
//   }

//   try {
//     await MenuItem.findByIdAndUpdate(_id, updateData);
//     return NextResponse.json(true);
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { message: "Error updating menu item", error: error.message },
//       { status: 500 }
//     );
//   }
// };







// export async function GET() {
//   mongoose.connect(process.env.MONGO_URL);
//   return Response.json(
//     await MenuItem.find().lean()
//   );
// }

















import { MenuItem } from "@/models/MenuItem";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

// Helper function to convert a readable stream to a buffer
const streamToBuffer = async (stream) => {
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
};

export const POST = async (req) => {
  await mongoose.connect(process.env.MONGO_URL);

  try {
    const formData = await req.formData();
    const image = formData.get("image");
    const name = formData.get("name");
    const description = formData.get("description");
    const basePrice = parseFloat(formData.get("basePrice"));
    const sizes = JSON.parse(formData.get("sizes"));
    const extraIngredientPrices = JSON.parse(formData.get("extraIngredientPrices"));

    if (!image || !name || !description || !basePrice) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Handle image conversion to buffer
    let imageBuffer = null;
    if (image && image.stream) {
      imageBuffer = await streamToBuffer(image.stream());
    }

    const menuItem = await MenuItem.create({
      image: imageBuffer,
      name,
      description,
      basePrice,
      sizes,
      extraIngredientPrices,
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

export const PUT = async (req) => {
  await mongoose.connect(process.env.MONGO_URL);

  try {
    const formData = await req.formData();
    const _id = formData.get("_id");
    const name = formData.get("name");
    const description = formData.get("description");
    const basePrice = parseFloat(formData.get("basePrice"));
    const image = formData.get("image");
    const sizes = JSON.parse(formData.get("sizes"));
    const extraIngredientPrices = JSON.parse(formData.get("extraIngredientPrices"));

    const updateData = { name, description, basePrice, sizes, extraIngredientPrices };

    // Handle image conversion to buffer
    if (image && image.stream) {
      const imageBuffer = await streamToBuffer(image.stream());
      updateData.image = imageBuffer;
    }

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
  await mongoose.connect(process.env.MONGO_URL);
  return Response.json(await MenuItem.find().lean());
}


export async function DELETE(req) {
  mongoose.connect(process.env.MONGO_URL);
  const url = new URL(req.url);
  const _id = url.searchParams.get('_id');
  await MenuItem.deleteOne({_id});
  console.log(_id);
  return Response.json(true);
}





























