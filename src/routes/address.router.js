import express from 'express';
import { verifyToken } from '../middlewares/auth.middleware.js';
import { addAddress, getUserAddresses, updateAddress, deleteAddress } from '../controllers/address.controller.js';

const addressRouter = express.Router();

addressRouter.post('/', verifyToken, addAddress);
addressRouter.get('/', verifyToken, getUserAddresses);
addressRouter.put('/:id', verifyToken, updateAddress);
addressRouter.delete('/:id', verifyToken, deleteAddress);

export default addressRouter;