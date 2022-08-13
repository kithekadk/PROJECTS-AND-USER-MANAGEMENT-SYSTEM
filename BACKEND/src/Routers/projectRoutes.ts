import { Router } from "express";
import { checkUserRole, createProject, projectAssign, projectDelete } from "../Controller/projectController";
import { verifyToken } from "../Middleware/tokenVerify";

const router = Router()

router.post('/create', createProject)
router.post('/delete', verifyToken, projectDelete)
router.post('/assignProject', verifyToken, projectAssign)
router.get('/check', verifyToken, checkUserRole)

export default router
