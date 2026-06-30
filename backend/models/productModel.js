import mongoose from "mongoose";

// Schema representing a product available in the store
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
        timestamps: true
    }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
