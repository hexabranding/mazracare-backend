import express from 'express';
import { 
  createProductDetailsCustomisation, 
  getAllProductDetailsCustomisations, 
  getUserProductDetailsCustomisations, 
  getUserSingleProductDetailsCustomisations
} from '../controllers/productDetailsCustomisation.controller.js';
import { verifyToken } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

const router = express.Router();

// User routes
router.post('/add', verifyToken, createProductDetailsCustomisation);
router.get('/my-customisations', verifyToken, getUserProductDetailsCustomisations);
router.get('/my-customisations-single', verifyToken, getUserSingleProductDetailsCustomisations);  

// Admin routes
router.get('/admin/all', verifyToken, authorizeRoles("Admin"), getAllProductDetailsCustomisations);

export default router;