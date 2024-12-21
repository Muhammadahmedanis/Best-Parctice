import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const tokenVerify = (req, res, next) => {
    try {
        if(req.headers?.authorization){
            const token = req.headers.authorization.split(" ")[1];
            const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
            if (verifyToken) {
                next()
            }else{
                res.status(403).status({status: 403, message: "token unauthorized"});
            }
            console.log(token);
        }else{
            res.status(403).send({status:402, message:"Token not found"});
        }
    } catch (error) {
            res.status(500).send({status: 500, error});        
    }
}