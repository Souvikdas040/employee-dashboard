import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const verifyUser = async (req, res, next) => {
    try {
        // Check if the Authorization header exists and is properly formatted
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, error: 'Authorization header missing or malformed' });
        }

        // Extract the token from the Authorization header
        const token = authHeader.split(' ')[1];

        // Verify the token using JWT and secret key
        const decoded = jwt.verify(token, process.env.JWT_KEY);

        // Ensure the user exists in the database
        const user = await User.findById(decoded._id).select('-password');
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        // Attach the user data to the request object
        req.user = user;

        // Continue to the next middleware or route handler
        next();
    } catch (error) {
        console.error("Authentication error:", error.message);

        // Handle specific JWT errors
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ success: false, error: 'Invalid token' });
        } else if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, error: 'Token expired' });
        }

        // Generic error handling for unexpected issues
        return res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

export default verifyUser;
