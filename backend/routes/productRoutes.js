import express from 'express';
import Product from '../models/productModel.js';
import expressAsyncHandler from "express-async-handler";
// Create the router
const productRouter = express.Router();

// Route for getting all products
productRouter.get('/api/products', async (req,res) => {
  // Get all products from the database
  const products = await Product.find(); 

    res.send(products); 
});

// // Route for searching products by category
// productRouter.get(
//     '/search',
//     expressAsyncHandler(async (req, res) => {
//       const { query } = req; // Get the query parameters from the request
//       const category = query.category || ''; // Get the category parameter, defaulting to an empty string if not provided
  
//       const categoryFilter = category && category !== 'all' ? { category } : {}; // Create a filter object based on the category parameter, or an empty object if no category parameter is provided or the category is "all"

//       const products = await Product.find({
//         ...categoryFilter, // Apply the category filter to the query
//       })
  
//       const countProducts = await Product.countDocuments({
//         ...categoryFilter, // Apply the category filter to the query
//       });
//       res.send({
//         products, // Send the matching products as a JSON response
//         countProducts, // Send the number of matching products as a JSON response
//       });
//     })
//   );

// Route for getting all product categories
productRouter.get('/api/products/categories',
expressAsyncHandler(async (req,res) => {
    // Get all unique categories from the database
    const categories = await Product.find().distinct('category'); 
    res.send(categories); 
}));

// Route for getting a product by slug
productRouter.get('/api/products/slug/:slug', async (req,res) => {
    // Find a product in the database based on the provided slug
    const product = await Product.findOne({slug: req.params.slug}); 
    if(product){
        // If a matching product is found, send it as a JSON response
        res.send(product); 
    } else {
        // If no matching product is found, send a 404 error response with a message
        res.status(404).send({message: 'Product not found'}) 
    }
});

// Route for getting a product by ID
productRouter.get('/api/products/:id', async (req,res) => {
    // Find a product in the database based on the provided ID
    const product = await Product.findById(req.params.id); 
    if(product){
        // If a matching product is found, send it as a JSON response
        res.send(product); 
    } else {
        // If no matching product is found, send a 404 error response with a message
        res.status(404).send({message: 'Product not found'}) 
    }
});


export default productRouter;