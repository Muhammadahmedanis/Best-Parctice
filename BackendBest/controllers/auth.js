import jwt from 'jsonwebtoken';
import { ENV } from '../constant/index.js';
import nodemailer from 'nodemailer'
import Users from '../models/user.js';
import bcrypt from 'bcrypt';
import 'dotenv/config';
import { OK, CREATED, BAD_REQUEST, UNAUTHORIZED, FORBIDDEN, NOT_FOUND, METHOD_NOT_ALLOWED, INTERNAL_SERVER_ERROR, CONFLICT } from 'http-status-codes';
import { sendError, sendSuccess } from '../utils/responses.js';
import { responseMessages } from '../constant/responseMessages.js';
import { generateToken } from '../helpers/token.js';
const { MISSING_FIELDS, USER_NAME_EXISTS, UN_AUTHORIZED, SUCCESS_REGISTRATION, NO_USER, SUCCESS_LOGIN, INVALID_OTP, OTP_EXPIRED, EMAIL_VERIFY } = responseMessages
import { v4 as uuidv4 } from 'uuid'
import { sendEmailOTP } from '../helpers/sendEmail.js';


// @desc    SIGNUP
// @route   POST /signup
// @access  Public

export const signUp = async (req, res) => {
    try {
        let { userName, email, password } = req?.body;
        if (!userName || !email || !password) {
            return res.status(BAD_REQUEST).send(sendError({ status: false, message: MISSING_FIELDS }));
        } else {
            let isNameExist = await Users.findOne({ email });
            if (isNameExist) {  // if user exist in db
                return res.send(CONFLICT).status(sendError({ status: false, message: USER_NAME_EXISTS }))
            } else {
                if (password.length > 7) {
                    const hashedPassword = bcrypt.hashSync(password, 10); // Use a different variable
                    const doc = new Users({
                        ...req.body,
                        email: email,
                        password: hashedPassword, // Use the hashed password here
                    })
                    // OTP 
                    const otp = uuidv4().slice(0, 6);
                    doc.otp = otp;
                    doc.expiresIn = Date.now() + 600000; // OTP expires in 10 minutes
                    let savedUser = await doc.save()
                    if (savedUser.errors) {
                        return res.status(BAD_REQUEST).send(sendError({ status: false, message: error.message, error }));
                    } else {
                        doc.isVerified = false;
                        const emailResponse = await sendEmailOTP(email, otp);
                        savedUser.password = undefined;
                        const token = generateToken({ data: savedUser, expiresIn: '24h' })
                        console.log(emailResponse, "email");

                        return res.status(CREATED).send(sendSuccess({ status: true, message: SUCCESS_REGISTRATION, data: savedUser, token }));
                    }
                } else {
                    return res.status(FORBIDDEN).send(sendError({ status: false, message: UN_AUTHORIZED }));
                }
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(INTERNAL_SERVER_ERROR).send(sendError({ status: 500, message: error.message }));
    }
};


// @desc    VERIFY EMAIL
// @route   POST api/auth/verifyEmail
// @access  Private

export const verifyEmail = async (req, res) => {
    try {
        const { otp } = req.body;
        if (otp) {
            const user = await Users.findOne({ email: req.user.email });
            if (user) {
                console.log(user.expiresIn > Date.now());
                if (user.expiresIn > Date.now()) {
                    user.isVerified = true;
                    user.otp = undefined;
                    await user.save();
                    res.status(OK).send(sendSuccess({ status: true, message: EMAIL_VERIFY, data: user }))
                } else {
                    return res.status(FORBIDDEN).send(sendError({ status: false, message: OTP_EXPIRED }))
                }
            } else {
                return res.status(FORBIDDEN).send(sendError({ status: false, message: INVALID_OTP }))
            }
        } else {
            return res.status(BAD_REQUEST).send(sendError({ status: false, message: MISSING_FIELDS }))
        }

    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR).send(sendError({ status: false, message: error.message, error }))
    }
}


// @desc    LOGIN
// @route   POST /login
// @access  Public

export const signIn = async (req, res) => {
    try {
        const { email, password } = req?.body;
        if (!email || !password) {
            return res.status(BAD_REQUEST).send(sendError({ status: false, message: MISSING_FIELDS }))
        }
        let user = await Users.findOne({ email });  //find will give an array and findOne only give sile object
        if (user) {
            const checkPassword = bcrypt.compareSync(password, user.password);
            if (checkPassword) {
                const dateAfter24Hr = new Date().getTime() + (24 * 60 * 60 * 1000);
                const token = generateToken({ data: user, expiresIn: '24h' });
                // const tokenPayload = ({id: user._id, email: user.email, password: user.password, admin: user.isAdmin })
                user.password = undefined;
                res.cookie("token", token, {
                    httpOnly: true,
                    secure: true,
                    expires: new Date(dateAfter24Hr),  // this is cookies expires and automatically logout hojaifa cookies nahi hogi
                });
                res.status(OK).send(sendSuccess({ status: true, mssage: SUCCESS_LOGIN, data: user, token }))
            } else {
                return res.status(UNAUTHORIZED).send(sendError({ status: false, message: UN_AUTHORIZED }))
            }

        } else {
            return res.status(NOT_FOUND).send(sendError({ status: false, message: NO_USER }))
        }
    } catch (error) {
        console.log(error);
        return res.status(INTERNAL_SERVER_ERROR).send({ status: 500, message: error.message })
    }
}



// @desc    resetPasswordEmail
// @route   GET api/auth/resetPasswordEmail
// @access  Public

export const resetPasswordEmail = (req, res) => {
    try {
        const { newPassword, confirmPassword, token } = req?.body;
        console.log(newPassword, confirmPassword, token );
        if(newPassword, confirmPassword, token){
            const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
            console.log(data);

        }else{
            return res.status(BAD_REQUEST).send({status: false, message: MISSING_FIELDS});
        }
    } catch (error) {
        res.status(INTERNAL_SERVER_ERROR).send(sendError({status: false, message: error.message}))
    }
}

//diff b/w encoding and encryption is encryption ko decode karna ka lia key chahia hoti ha but encoding ka lia nahi
//diff b/w normal cokkies and http cookies id normal cookies ko ham get karsakta hain JS se but http nahi aur nahikoi another library et karsakti ha http cookies ko
// jwt and cookies expire both are different  cookies expire decided given time ka baad ye browser se remove hoga and jwt ma expire decided karega jwt kab tak valid h