import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js'
import { addLeave, getLeave } from '../controllers/leaveController.js';

const router = express.Router();

router.post('/add', authMiddleware, addLeave)
router.get("/:id/:role", authMiddleware, getLeave);
// router.get("/detail/:id", authMiddleware, getLeaveDetail);
// router.get("/", authMiddleware, getLeaves);
// router.get("/:id", authMiddleware, updateLeave);

export default router;