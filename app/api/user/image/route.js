// import { writeFile } from "fs/promises";
// import User from "../../../../models/user";
// import dbConnect from "../../../../lib/dbConnect";
// import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import cloudinary from '../../../../lib/cloudinary'
import streamifier from "streamifier";


// export const POST = async (req) => {
//     try {
//         const session = await getServerSession()
//         const data = await req.formData();
//         const file = data.get('profile')
//         const byteData = await file.arrayBuffer();
//         const buffer = Buffer.from(byteData);
//         const path = `./public/profile/${file.name}`;
//         await dbConnect()
//         await User.updateOne({ email: session.user.email }, {
//             $set: {
//                 image: `./profile/${file.name}`
//             }
//         })

//         await writeFile(path, buffer);
//         return new Response("Image uploaded Successfully", { status: 200 })
//     } catch (err) {
//         console.log(err);
//         return new Response(err.message, { status: 500 })
//     }
// }

async function uploadImageFromBuffer(buffer, folder, public_id) {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { folder, public_id },
            (error, result) => {
                if (error) {
                    reject(error);

                } else {
                    resolve(result);
                }
            }
        );

        streamifier.createReadStream(buffer).pipe(uploadStream);
    });
}

export const POST = async (req) => {
    try {
        const data = await req.formData();
        const file = data.get('profile')
        const byteData = await file.arrayBuffer();
        const imageBuffer = Buffer.from(byteData);
        let public_id = file.name.split(".")[0]
        const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        if(specialCharRegex.test(public_id)){
            public_id = undefined
        }
        const cloudinaryResult = await uploadImageFromBuffer(imageBuffer, "profile", public_id)
        return NextResponse.json({
            success: true,
            secureUrl: cloudinaryResult.secure_url,
        });
    } catch (error) {
        console.error("Cloudinary upload error:", error);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}