import jwt from 'jsonwebtoken';

/**
 * Middleware to authenticate seller based on JWT stored in cookies
 * 
 * Checks for a JWT token in the 'seller_cookie' cookie, verifies it,
 * and authorizes only if the email in the token matches the configured seller email.
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const authSeller = async (req, res, next) => {
  try {
    // Extract JWT token from cookies
    const { seller_cookie } = req.cookies;

    // Verify the token using the JWT secret
    const decoded = await jwt.verify(seller_cookie, process.env.JWT_SECRET);

    // Extract email from the decoded token
    const email = decoded.email;

    // Check if the email matches the authorized seller email
    if (email !== process.env.SELLER_EMAIL) {
      return res.json({ success: false, message: 'Not authorized' });
    }

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Handle invalid token or other errors
    return res.json({ success: false, message: error.message });
  }
};

export default authSeller;