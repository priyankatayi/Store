import Address from "../models/Address.js";

/**
 * @route   POST /api/address/add
 * @desc    Add a new address for the authenticated user
 * @access  Protected (requires authentication middleware to set req.userId)
 */
export const addAddress = async (req, res) => {
  try {
    const { address } = req.body;
    const { userId } = req;
    await Address.create({ userId, ...address });
    res.json({ success: true, message: 'Address Updated' });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

/**
 * @route   GET /api/address/get
 * @desc    Retrieve all addresses for the authenticated user
 * @access  Protected (requires authentication middleware to set req.userId)
 */
export const getAddress = async (req, res) => {
  try {
    const { userId } = req;
    const address = await Address.find({ userId });
    res.json({ success: true, address });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
