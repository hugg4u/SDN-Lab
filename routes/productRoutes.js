const express = require('express');
const { getAllProduct, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');

const router = express.Router();

// GET: / => Get all products
router.get('/', getAllProduct);
router.post('/create', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;