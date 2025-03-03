const Product = require('../models/product');
const Category = require('../models/category');

exports.getAllProduct = async (req, res, next) => {
    try {
        const products = await Product.find().populate('category', 'name description');
        if (!products || products.length === 0) {
            return res.status(404).json({ message: "Products not found" });
        }

        // Formatting data
        const newProducts = products.map(p => {
            return {
                id: p._id,
                pName: p.name,
                pPrice: p.price,
                pStock: p.stock,
                category: p.category ? {
                    id: p.category._id,
                    cName: p.category.name,
                    description: p.category.description
                } : null
            }
        });
        return res.status(200).json(newProducts);
    } catch (error) {
        error.status = 500;
        error.message = "Error fetching products: " + error.message;
        return next(error);
    }
}

exports.createProduct = async (req, res, next) => {
    try {
        const { name, price, stock, category } = req.body;
        
        // Verify category exists before creating product
        const categoryExists = await Category.findById(category);
        if (!categoryExists) {
            return res.status(400).json({ message: "Category not found" });
        }
        const product = new Product({ name, price, stock, category });
        const newDoc = await product.save();
        return res.status(201).json(newDoc);
    } catch (error) {
        error.status = 500;
        error.message = "Error creating product: " + error.message;
        return next(error);
    }
}

exports.updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, price, stock, category } = req.body;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        product.name = name ? name: product.name;
        product.price = price ? price.price : product.price;
        product.stock = stock ? stock : product.stock;
        product.category = category ? category : product.category;
        const updatedProduct = await product.save();
        return res.status(200).json(updatedProduct);
    } catch (error) {
        error.status = 500;
        error.message = "Error updating product: " + error.message;
        return next(error);
    }
}

exports.deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }        
        await Product.findByIdAndDelete(id);
        return res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        error.status = 500;        
        error.message = "Error deleting product: " + error.message;
        return next(error);
    }
}