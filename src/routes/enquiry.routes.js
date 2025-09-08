import express from 'express';
import enquiryController from '../controllers/enquiry.controller.js';
import { verifyToken } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

const router = express.Router();

// User routes
router.post('/add', verifyToken, enquiryController.createEnquiry);

// Admin routes
router.get('/list', verifyToken,  authorizeRoles("Admin"), enquiryController.getAllEnquiries);
router.patch('/status/:id', verifyToken,  authorizeRoles("Admin"), enquiryController.updateStatus);

export default router;