import express from 'express';
import { 
  createCustomization, 
  getAllCustomizations, 
  getSingleCustomizations, 
  getUserCustomizations 
} from '../controllers/customization.controller.js';
import { verifyToken } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

const router = express.Router();

// User routes
router.post('/add', verifyToken, createCustomization);
router.get('/my-customizations', verifyToken, getUserCustomizations);
router.get('/my-customizations-single', getSingleCustomizations);

// Admin routes
router.get('/admin/all', verifyToken, authorizeRoles("Admin"), getAllCustomizations);

export default router;