const { verifyToken } = require('../utils/jwt');
const { errorResponse } = require('../utils/response');

const authenticate = async (req, res, next) => {
  try {

    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return errorResponse(res, 'No token provided', 401);
    }

    const token = authHeader.split(' ')[1];

    const decoded = verifyToken(token);

    req.user = {
      id: decoded.id,
      email: decoded.email,
    };

    next();
  } catch (error) {
    return errorResponse(res, 'Invalid or expired token', 401);
  }
};

module.exports = { authenticate };