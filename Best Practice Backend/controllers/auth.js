import express from 'express';
import Users from '../models/auth.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const signUp = async(req, res) => {
    try {
        const password = bcrypt.hashSync(req.body.password, 10);
        const user = await Users.create({
            ...req.body,
            password,
        });
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET)
        res.status(201).send({status: 201, user});
    } catch (error) {
        res.status(500).send({status: 500, messgae: "Not found", error});
    }
}

export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({email});  //find will give an array and findOne only give sile object
        if(user){
            const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET)
            const checkPassword = bcrypt.compareSync(password, user.password)
            if(checkPassword){
                res.status(200).send({status: 200, mssage: "Login successfully", token})
            }else {
                res.status(401).send({status: 401, message: "Invalid credentials"})
            }
        }else{
            res.status(404).send({status: 404, message: "User not found"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({status: 500, error})
    }
}