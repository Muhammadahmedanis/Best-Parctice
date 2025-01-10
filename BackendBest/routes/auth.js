import express from 'express';
import { signUp, signIn, verifyEmail, resetPasswordEmail, logout, forgotPasswordEmail } from '../controllers/auth.js';
import { getUsers } from '../controllers/getUser.js';
import { tokenVerify } from '../helpers/token.js';
const authRouter = express.Router();

authRouter.post('/signup', signUp);
authRouter.post('/signin', signIn);
authRouter.post('/logout', logout)
authRouter.post('/verifyEmail', tokenVerify, verifyEmail);
authRouter.post('/forgotPass', forgotPasswordEmail)
authRouter.post('/resetPass/:token', resetPasswordEmail);
// authRouter.get('/users', tokenVerify, getUsers); // header tokrn bhjna ha postman se

export default authRouter;