import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const adminMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select('-password'); // ✅ Add await here

    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Forbidden: Admins only' });
    }

    next();

  } catch (error) {
    console.error('JWT Error:', error);
    res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' });
  }
};

export default adminMiddleware;
