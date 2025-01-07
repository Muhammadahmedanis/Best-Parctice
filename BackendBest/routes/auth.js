import express from 'express';
import { signUp, signIn, verifyEmail, resetPasswordEmail } from '../controllers/auth.js';
import { getUsers } from '../controllers/getUser.js';
import { tokenVerify } from '../helpers/token.js';
const authRouter = express.Router();
// import { tokenVerify } from '../config/tokenVerify.js';

authRouter.post('/signup', signUp);
authRouter.post('/signin', signIn);
authRouter.post('/verifyEmail', tokenVerify, verifyEmail);
authRouter.post('/resetPassword', resetPasswordEmail);
// authRouter.get('/users', tokenVerify, getUsers); // header tokrn bhjna ha postman se

export default authRouter;