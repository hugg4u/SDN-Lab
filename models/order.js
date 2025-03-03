const mongoose = require('mongoose');
const UserSchema = require('./user');

const OrderSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async (id) => {
                const user = await UserSchema.findById(customerId);
                return user && user.role === 'user';
            },
            message: 'Customer must be a user'
        }
    },
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        name: String,
        quantity: Number
    }],
    total: Number,
    status: String,
    orderDate: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Order', OrderSchema);