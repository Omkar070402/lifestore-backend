import productMode from "../models/productModel.js"
import { cloudinary } from '../configs/cloudinary.js'


const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

        // Extract images from req.files (memory storage)
        const images = req.files ? Object.values(req.files).map(file => file[0]) : [];

        let imagesUrl = await Promise.all(
            images.map(file => new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { resource_type: "image" },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result.secure_url);
                    }
                );
                uploadStream.end(file.buffer); // Upload from memory
            }))
        );

        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === "true",
            sizes: JSON.parse(sizes),
            image: imagesUrl,
            date: Date.now()
        };

        const product = new productMode(productData);
        await product.save();

        res.json({ success: true, message: "Product added" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};
const listProduct = async (req, res) => {

    try {

        const products = await productMode.find({})
        res.json({ success: true, products })

    } catch (error) {

        console.log(error)
        res.json({ success: false, message: error.message })
    }



}
const removeProduct = async (req, res) => {

    try {

        await productMode.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: 'Product Removed' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })

    }

}
const singleProduct = async (req, res) => {

    try {

        const { productId } = req.body

        const product = await productMode.findById(productId)
        res.json({ success: true, product })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

const getCategory = async (req, res) => {
    try {

        const { category } = req.body

        const filter = category.length > 0 ? { category: { $in: category } } : {}

        const products = await productMode.find(filter)

        res.json({
            success: true,
            products,
            error: false
        })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { addProduct, listProduct, removeProduct, singleProduct , getCategory }