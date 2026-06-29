import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        productName: { type: String, required: true, unique: true},
        slug: { type: String, required: true, unique: true},
        category: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true},
        countInStock: { type: Number, required: true},
        brand: { type: String, required: true },
        description: { type: String, required: true },
    },
    {
        timestamps: true // for update and creation info
    }
);

const Product = mongoose.model('Product', productSchema);

export default Product; 