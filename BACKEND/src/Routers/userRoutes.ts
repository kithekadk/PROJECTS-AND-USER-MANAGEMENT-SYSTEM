import { Router} from "express";
import { loginUser, registerUser, updateComplete } from "../Controller/userController";

const userRouter = Router();

userRouter.post('/create',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/setDone',updateComplete)

export default userRouter;