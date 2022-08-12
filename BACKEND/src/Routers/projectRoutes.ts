import { Router } from "express";
import { checkUserRole, createProject, projectAssign, projectDelete } from "../Controller/projectController";
import { verifyToken } from "../Middleware/tokenVerify";

const router = Router()

router.post('/create', createProject)
router.post('/delete', projectDelete)
router.post('/assignProject', projectAssign)
router.post('/check', verifyToken)

export default router
