import Cart from "../models/Cart.js";


// /api/cart/update
export const updateCart = async (req, res) => {
  try{
        const { id, cartItems } = req.body.item;
        await User.findByIdAndUpdate(id, { cartItems });
        res.json({ success: true, message: 'Cart Updated' })
    } catch(error) {
        res.json({success: false, message: error.message})
    }
}