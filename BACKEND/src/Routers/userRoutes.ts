import { Router} from "express";
import { homePage } from "../Controller/projectController";
import { loginUser, registerUser, updateComplete } from "../Controller/userController";

const userRouter = Router();

userRouter.post('/create',registerUser)
userRouter.post('/login',loginUser, homePage)
userRouter.post('/setDone',updateComplete)

export default userRouter;