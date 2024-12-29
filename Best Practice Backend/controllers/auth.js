import express from 'express';
import Users from '../models/auth.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { ENV, INCORRECT_EMAIL_PASSWORD, INTERNAL_SERVER_ERROR } from '../constant/index.js';

// @desc    SIGNUP
// @route   POST /signup
// @access  Public

export const signUp = async(req, res) => {
    let {userName, email, password} = req?.body;
    if (!userName || !email || !password) {
        return res.status(403).send("required parameter missing, {email: abc@gmail.com, password: asbc123}");
    }
    email = email.toLowerCase();
    try {
        let check = await Users.findOne({ email: email });
        if (!check) {  // if user not exist
            if (password.length >= 8) {
                const hashedPassword = bcrypt.hashSync(password, 10); // Use a different variable
                const user = await Users.create({
                    ...req.body,
                    email: email,
                    password: hashedPassword, // Use the hashed password here
                });
                res.status(201).send({ status: 201, message: "Signup successful", user });
            } else {
                res.status(410).send({ status: 401, message: "Password is less than 8" });
            }
        } else {
            res.status(403).send({ status: 403, message: "User already exists with this email" });
        }
    } catch (error) {
        res.status(500).send({ status: 500, message: "INTERNAL_SERVER_ERROR" });
    }
};


// @desc    LOGIN
// @route   POST /login
// @access  Public

export const signIn = async (req, res) => {
    if(!req.body?.email || !req.body?.password){
        return res.status(403).send("required parameter missing, {email: abc@gmail.com, password: asbc123}")
    }
    req.body.email = req.body.email.toLowerCase();
    try {
        // const { email, password } = req.body;
        const user = await Users.findOne({email: req.body.email});  //find will give an array and findOne only give sile object
        if(user){
            const dateAfter24Hr = new Date().getTime() + (24 * 60 * 60 * 1000);
            const token = jwt.sign({ 
                isAdmin: false,
                email: req.body.email,
                id: user._id,
            }, ENV.JWT_SECRET, {
                expiresIn: '24h'})
            res.cookie("token",token, {
                httpOnly: true,
                secure: true,
                expires: new Date(dateAfter24Hr),  // this is cookies expires and automatically logout hojaifa cookies nahi hogi
            });

            const checkPassword = await bcrypt.compareSync(req.body.password, user.password)
            if(checkPassword){
                res.status(200).send({status: 200, mssage: "Login successfully", token})
            }else {
                res.status(401).send({status: 401, message: "Invalid credentials"})
            }
        }else{
            res.status(404).send({status: 404, message: INCORRECT_EMAIL_PASSWORD})
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({status: 500, error})
    }
}

//diff b/w encoding and encryption is encryption ko decode karna ka lia key chahia hoti ha but encoding ka lia nahi
//diff b/w normal cokkies and http cookies id normal cookies ko ham get karsakta hain JS se but http nahi aur nahikoi another library et karsakti ha http cookies ko
// jwt and cookies expire both are different  cookies expire decided given time ka baad ye browser se remove hoga and jwt ma expire decided karega jwt kab tak valid h