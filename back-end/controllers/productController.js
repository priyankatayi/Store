import Product from "../models/Product.js";
import { v2 as cloudinary } from "cloudinary";

export const addProduct = async (req, res) => {
    try {
        const product = req.body.product;
        const images = req.files;
        console.log(images, 'images')
        const imageURL = await Promise.all(images.map(async (item) => {
           let result = await cloudinary.uploader.upload(item.path, {resource_type: 'image'})
            return result.secure_url;
        }));
        const data = await Product.create({...product, image: imageURL});
        res.json({ success: true, data, message: "Product created" })
    }
    catch(error) {
        res.json({success: false, message: error.message})
    }
}

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json({ success: true, products })
    }
    catch(error) {
        res.json({success: false, message: error.message})
    }
}

export const getProductById = async (req, res) => {
    try {
        const { id } = req.body;
        const product = await Product.findById(id);
        res.json({ success: true, product })
    }
    catch(error) {
        res.json({success: false, message: error.message})
    }
}


export const changeStock = async(req, res) => {
    try {
        const { id, inStock } = req.body;
        await Product.findByIdAndUpdate(id, { inStock });
        res.json({ success: true, message: 'Stock Updated' })
    }
    catch(error) {
        res.json({success: false, message: error.message})
    }
}