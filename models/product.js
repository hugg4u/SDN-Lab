const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    price: {
        type: Number,
        min: {value: 0, message: 'Price cannot be negative'}
    },
    stock: {
        type: Number,
        min: {value: 0, message: 'Stock cannot be negative'}
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Product', ProductSchema)