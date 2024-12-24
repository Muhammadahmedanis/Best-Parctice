import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const tokenVerify = (req, res, next) => {
    try {
        // Check for token in Authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(403).send({ status: 403, message: "Token not found" });
        }
        // Extract token from "Bearer <token>"
        // const token = req.headers.authorization;
        // console.log(token);
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach decoded data to req object
        req.user = {
            email: decoded.email,
            isAdmin: decoded.isAdmin || false,
        };

        next(); // Proceed to the next middleware
    } catch (error) {
        const status = error.name === "JsonWebTokenError" ? 401 : 500;
        res.status(status).send({ status, message: error.message });
    }
};