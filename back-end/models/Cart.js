import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    id: { type: String, required: true },
    quantity: { type: Number, required: true },
})

const Cart = mongoose.models.Cart || mongoose.model('cart', cartSchema);

export default Cart;