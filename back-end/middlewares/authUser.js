import jwt from 'jsonwebtoken';

/**
 * Middleware to authenticate user based on JWT stored in cookies.
 * 
 * Verifies the token and attaches the user ID to the request object if valid.
 * Sends an unauthorized response if token is missing or invalid.
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const authUser = async (req, res, next) => {
  // Get JWT token from cookies
  const token = req.cookies.token;

  // If no token present, reject unauthorized request
  if (!token) {
    return res.json({ success: false, message: 'Unauthorized User' });
  }

  try {
    // Verify the token with the secret key
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);

    // Extract user ID from the token payload
    const userId = decodedToken.id;

    if (userId) {
      // Attach userId to request for use in downstream middleware/routes
      req.userId = userId;
      next();
    } else {
      // If no userId in token, reject request
      return res.json({ success: false, message: 'Unauthorized User' });
    }
  } catch (error) {
    // Handle errors such as invalid token or verification failure
    return res.json({ success: false, message: error.message });
  }
};

export default authUser;
