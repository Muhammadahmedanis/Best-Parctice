import Users from './model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { ENV, INCORRECT_EMAIL_PASSWORD, INTERNAL_SERVER_ERROR } from "../constant/constant.js";

// @desc    SIGNUP
// @route   POST /signup
// @access  Public


export const signUp = async(req, res) => {
    let {userName, email, password} = req?.body;
    if (!userName || !email || !password) {
        req.status(403).send({status: 403, message: "required parameter missing, {email: abc@gmail.com, password: asbc123"})
    }
    email = email.toLowerCase();
    try {
        let check = await Users.findOne({ email })
        if (!check) {
            if (password.length >= 8) {
                console.log(password.length);
                let hashPassword = bcrypt.hashSync(password, 10);
                const user = await Users.create({
                    ...req.body,
                    email,
                    password: hashPassword,
                });
                res.status(200).send({status: 200, message: "Signup successfull", user});
            }else{
                res.status(401).send({status: 401, message: "Password is less than 8"});
            }
        }else{
            res.status(403).send({status: 403, message: "User already exist with this email"});
        }
    } catch (error) {
        res.status(403).send({status: 403, message: INTERNAL_SERVER_ERROR, error})
    }
}

// @desc    LOGIN
// @route   POST /login
// @access  Public

export const signIn = async(req, res) => {
    try {
        let {email, password} = req?.body;
        if (!email || !password) {
            return res.status(403).send({status: 403, message: "required parameter missing, {email: abc@gmail.com, password: asbc123"});
        }
        email = email.toLowerCase();
        const user = await Users.findOne({ email }).select('-__v'); // .select('-__v') user for don't need of word
        if(user){
            const checkPassword = await bcrypt.compare(password, user.password);
            if(checkPassword){
                const dateAfter24Hr = new Date().getTime() + (24 * 60 * 60 * 1000);
                const token = jwt.sign({
                    isAdmin: false,
                    email,
                    id: user._id,
                }, ENV.JWT_SECRET,{
                    expiresIn: "24h"})
                res.cookie("token", token, {
                    httpOnly: true,
                    secure: true,
                    expires: new Date(dateAfter24Hr),
                })
                res.status(200).send({status: 200, message: 'Login successfull', token, user});
            }else{
                res.status(403).send({status: 403, message: "Invlid credentials"});
            }
        }else{
            res.status(404).send({status: 404, message: INCORRECT_EMAIL_PASSWORD});
        }
    } catch (error) {
        res.status(403).send({status: 403, message: INTERNAL_SERVER_ERROR, error})        
    }
}