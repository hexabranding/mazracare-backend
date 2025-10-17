import express from 'express';
import getInTouchController from '../controllers/getintouch.controller.js';
import { verifyToken } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

const router = express.Router();

// User routes
router.post('/add', getInTouchController.createGetInTouch);
router.get('/single', getInTouchController.getSingleGetInTouch);

// Admin routes
router.get('/list', verifyToken, authorizeRoles("Admin"), getInTouchController.getAllGetInTouch);
router.patch('/status/:id', verifyToken, authorizeRoles("Admin"), getInTouchController.updateGetInTouchStatus);

export default router;