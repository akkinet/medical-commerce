import dbConnect from '../../../lib/dbConnect'
// import items from '../../../data/product.json'
import Category from '../../../models/category'
import { getGoogleImageUrls, extractFileName } from '../../../lib/helperFunction';
import Product from '../../../models/product'
import cloudinary from '../../../lib/cloudinary'

export const GET = async (req) => {
    try {
        await dbConnect()
        const { searchParams } = new URL(req.url)
        const num = searchParams.get("num")

        for (let item of items) {
            let cat = await Category.findOne({ name: item.category })
            if (!cat) {
                const [url, _] = await getGoogleImageUrls(item.category, 1)
                let uploadResult;
                if (url) {
                    const filename = extractFileName(url)
                    uploadResult = await cloudinary.uploader
                        .upload(
                            url, {
                            public_id: filename,
                        }
                        )
                        .catch((error) => {
                            console.log(error);
                        });
                }
                cat = new Category({
                    name: item.category,
                    image: uploadResult?.secure_url
                })
                await cat.save()
            }

            const product = new Product(item)
            product.category = cat
            const urls = await getGoogleImageUrls(item.title, num)
            const images = []
            for (let url of urls) {
                const filename = extractFileName(url)
                if (url.split(".com").length == 2 && url.indexOf(".jpg") != -1) {
                    const uploadResult = await cloudinary.uploader
                        .upload(
                            url, {
                            public_id: filename,
                        }
                        )
                        .catch((error) => {
                            console.log(error);
                        });
                    images.push(uploadResult?.secure_url)
                }
            }

            product.images = images
            await product.save()
        }

        return new Response("uploaded", { status: 200 })
    } catch (err) {
        return new Response(err.message, { status: 500 })
    }
}