import jwt, { decode } from 'jsonwebtoken';
import 'dotenv/config';
import { INTERNAL_SERVER_ERROR, UNAUTHORIZED } from 'http-status-codes';
import { responseMessages } from '../constant/responseMessages.js';
const { INVALID_TOKEN} = responseMessages;
const { sign, verify } = jwt;

export const generateToken = ({data}) => {
    return sign({ 
        data 
    }, process.env.JWT_SECRET_KEY)
    // const token = sign({
    //     isAdmin: false,
    //     email: req.body.email,
    //     id: user._id,
    // }, process.env.JWT_SECRET_KEY, {
    //     expiresIn: '24h'
    // })
}


export const tokenVerify = (req, res, next) => {
    try {
        // Check for token in Authorization header & Extract token from "Bearer <token>"
            const { authorization } = req.headers
            if ( authorization && authorization.startsWith('Bearer')) {
            // Verify Token
            const token = authorization.split(" ")[1];
            const { data } = verify(token, process.env.JWT_SECRET_KEY);
            req.user = data;
            next(); // Proceed to the next middleware
        }else{
            return res.status(UNAUTHORIZED).send({ status: false, message: INVALID_TOKEN});
        }
    } catch (error) {
        console.log(error);
        return res.status(INTERNAL_SERVER_ERROR).send({ status: false, message: error.message });
    }
};