import express from 'express';
import { signUp, signIn } from '../controllers/auth.js';
import { getUsers } from '../controllers/getUser.js';
const authRouter = express.Router();
import { tokenVerify } from '../config/tokenVerify.js';

authRouter.post('/signup', signUp);
authRouter.post('/signin', signIn);
authRouter.get('/users', tokenVerify, getUsers); // header tokrn bhjna ha postman se

export default authRouter;