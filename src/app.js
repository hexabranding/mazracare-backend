import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import path from 'path';

import errorHandler from './middlewares/error.middleware.js';
import ApiError from './utils/ApiError.js';
import authRouter from './routes/auth.router.js';
import passRouter from './routes/password.router.js';
import productRouter from './routes/product.router.js';
import cookieParser from 'cookie-parser';
import cartRouter from './routes/cart.router.js';
import userRouter from './routes/user.router.js';
import orderRouter from './routes/order.router.js';
import wishlistRouter from './routes/wishlist.router.js';
import serviceRouter from './routes/service.router.js';
import blogRouter from './routes/blog.router.js';
import dashboardRouter from './routes/dashboard.route.js';
import EnquiryRouter  from './routes/enquiry.routes.js';
import getInTouchRouter from './routes/getintouch.routes.js';
import productDetailsCustomisationRoutes from './routes/productDetailsCustomisation.routes.js';
import customizationRoutes from './routes/customization.routes.js';
import carriereRouter from './routes/carrier.routes.js';
import galleryRouter from './routes/gallery.router.js';


dotenv.config();
const app=express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

// Serve static files (before rate limiter)
app.use('/uploads', express.static('uploads'));
app.use('/uploads', express.static('./uploads'));
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Explicit route for file serving (production fix)
app.get('/uploads/*', (req, res) => {
  const filePath = path.join(process.cwd(), req.path);
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).json({ success: false, message: 'File not found' });
    }
  });
});

// Rate limiter
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use(limiter);

// Routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/password', passRouter);
app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/wishlist', wishlistRouter);
app.use('/api/order', orderRouter);
app.use('/api/service', serviceRouter);
app.use('/api/blog', blogRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('/api/enquiry', EnquiryRouter);
app.use('/api/getintouch', getInTouchRouter);
app.use('/api/product-details-customisation', productDetailsCustomisationRoutes);
app.use('/api/customization', customizationRoutes);
app.use('/api/carrier', carriereRouter);
app.use('/api/gallery', galleryRouter);

// 404 Handler (if no route matches)
app.use((req, res, next) => {
  next(new ApiError(404, 'Route not found'));
});

// Centralized error handler (must be last!)
app.use(errorHandler);

export default app;