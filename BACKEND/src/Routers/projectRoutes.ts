import { Router } from "express";
import { createProject, projectAssign, projectDelete } from "../Controller/projectController";
import { verifyToken } from "../Middleware/tokenVerify";

const router = Router()

router.post('/create', createProject)
router.post('/delete', verifyToken, projectDelete)
router.post('/assignProject', projectAssign)


export default router
