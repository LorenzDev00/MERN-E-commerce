import express from 'express';
import Product from '../models/productModel.js';
import expressAsyncHandler from "express-async-handler";

const productRouter = express.Router();

// GET /api/products - list all products
productRouter.get('/api/products', async (req,res) => {
  const products = await Product.find(); 
    res.send(products); 
});

// GET /api/products/categories - list all distinct product categories
productRouter.get('/api/products/categories',
expressAsyncHandler(async (req,res) => {
    const categories = await Product.find().distinct('category'); 
    res.send(categories); 
}));

// GET /api/products/slug/:slug - get a single product by its slug
productRouter.get('/api/products/slug/:slug', async (req,res) => {
    const product = await Product.findOne({slug: req.params.slug}); 
    if(product){
        res.send(product); 
    } else {
        res.status(404).send({message: 'Product not found'}) 
    }
});

// GET /api/products/:id - get a single product by its id
productRouter.get('/api/products/:id', async (req,res) => {
    const product = await Product.findById(req.params.id); 
    if(product){
        res.send(product); 
    } else {
        res.status(404).send({message: 'Product not found'}) 
    }
});

export default productRouter;
