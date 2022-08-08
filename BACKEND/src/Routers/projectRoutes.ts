import { Router } from "express";
import { createProject, projectAssign, projectDelete } from "../Controller/projectController";

const router = Router()

router.post('/create', createProject)
router.post('/delete', projectDelete)
router.post('/assignProject', projectAssign)


export default router
