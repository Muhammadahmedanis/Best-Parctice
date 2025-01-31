import { Router } from "express";
import { verifyAdmin } from "../middlewares/auth.middleware.js";
import { deleteUser, getAlluser, updateUser } from "../controllers/user.controller.js";
import { createRateLimiter } from "../middlewares/rate-limitting.middleware.js";

const userRouter = Router();
userRouter.route("/").get(verifyAdmin, createRateLimiter(5 * 60 * 1000, 20, "Too much fetch user request hit, please try again after five minute"), getAlluser);
userRouter.route("/delete/:userId").delete(verifyAdmin, deleteUser);
userRouter.route("/update/:userId").put(verifyAdmin, updateUser);

export default userRouter;