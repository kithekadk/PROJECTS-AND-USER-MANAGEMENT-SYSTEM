import { Router } from "express";
import { checkUserRole, completeProjects, createProject, pendingProjects, projectAssign, projectDelete } from "../Controller/projectController";
import { verifyToken } from "../Middleware/tokenVerify";

const router = Router()

router.post('/create', createProject)
router.post('/delete', verifyToken, projectDelete)
router.post('/assignProject', verifyToken, projectAssign)
router.get('/check', verifyToken, checkUserRole)
router.post('/pendingProjects', pendingProjects)
router.post('/completeProjects', completeProjects)


export default router
