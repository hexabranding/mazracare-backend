import express from 'express';
import { createCarrier, getAllCarriers } from '../controllers/carrier.controller.js';
import { verifyToken } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import pdfUpload from "../middlewares/pdfUpload.middleware.js";

const router = express.Router();

// Public route - anyone can apply
router.post('/add', pdfUpload.single('resume'), createCarrier);

// Admin route - view all applications
router.get('/admin/all', verifyToken, authorizeRoles("Admin"), getAllCarriers);

export default router;