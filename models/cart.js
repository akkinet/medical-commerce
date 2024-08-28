import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    quantity: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

const Cart = mongoose.models.Cart || mongoose.model('Cart', cartSchema);

export default Cart;
