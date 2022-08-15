import { Router} from "express";
import { homePage } from "../Controller/projectController";
import { checkAssigned, displayAllUsers, loginUser, registerUser, updateComplete } from "../Controller/userController";
import { verifyToken } from "../Middleware/tokenVerify";

const userRouter = Router();

userRouter.post('/create',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/setDone',updateComplete)
userRouter.post('/assigned', checkAssigned)
userRouter.post('/allusers', displayAllUsers)

export default userRouter;