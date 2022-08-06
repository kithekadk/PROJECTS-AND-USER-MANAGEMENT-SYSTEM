import { Router} from "express";
import { registerUser, updateComplete } from "../Controller/userController";

const userRouter = Router();

userRouter.post('/create',registerUser)
userRouter.post('/setDone',updateComplete)

export default userRouter;