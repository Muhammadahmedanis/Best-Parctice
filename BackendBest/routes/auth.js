import express from 'express';
import { signUp, signIn, verifyEmail, resetPasswordEmail, logout, forgotPasswordEmail, resendOtp } from '../controllers/auth.js';
import { tokenVerify } from '../middleware/token.js';
const authRouter = express.Router();

authRouter.post('/signup', signUp);
authRouter.post('/signin', signIn);
authRouter.post('/logout', logout);
authRouter.post('/verifyEmail', tokenVerify, verifyEmail);
authRouter.post('/forgotPass', forgotPasswordEmail);
authRouter.post('/resetPass/:token', resetPasswordEmail);
authRouter.post('/resendOtp', resendOtp);
// authRouter.get("/checkAuth", tokenVerify, checkAuth);

export default authRouter;