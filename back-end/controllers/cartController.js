import User from '../models/User.js';

/**
 * @route   POST /api/cart/update
 * @desc    Updates the cart items for the logged-in user
 * @access  Protected (requires authentication middleware to set req.userId)
 */

export const updateCart = async (req, res) => {
  try {
    const { cartItems } = req.body;
    const userId = req.userId;

    await User.findByIdAndUpdate(userId, { cartItems });

    res.json({ success: true, message: 'Cart Updated' });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};