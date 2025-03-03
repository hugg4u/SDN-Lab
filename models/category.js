const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        maxLength: [50, 'Name cannot exceed 50 characters'],
    },
    description: String
}, { timestamps: true });

module.exports = mongoose.model('Category', CategorySchema);