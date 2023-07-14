import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        max: 30,
    },
    isnew: {
        type: Boolean,
        required: false,
    },
    oldPrice: {
        type: String,
        required: false,
    },
    price: {
        type: Number,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    category: {
        type: String,
        required: false,
    },
    image: {
        type: String,
        required: false,
        default: 'https://picsum.photos/1920/1080'
    },
    rating: {
        type: Number,
        required: false,
        max: 5,
        min: 0,
        default: 0
    },
}, { timestamps: true, strict: true })

const productModel = mongoose.model('productModel', ProductSchema, 'products')
export default productModel