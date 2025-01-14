import express from 'express';
import { deletetUser, editUser, getAllUser, } from '../controllers/user.js';
import { verifyAdmin } from '../middleware/token.js';
const userRouter = express.Router();

userRouter.get("/getUsers", verifyAdmin, getAllUser);
userRouter.put("/editUser/:id", verifyAdmin, editUser);
userRouter.delete("/deleteUser/:id", verifyAdmin, deletetUser);

export default userRouter;