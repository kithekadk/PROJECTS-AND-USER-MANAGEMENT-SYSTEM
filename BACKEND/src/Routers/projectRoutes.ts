import { Router } from "express";
import { createProject, projectDelete } from "../Controller/projectController";

const router = Router()

router.post('/create', createProject)
router.post('/delete', projectDelete)

export default router
