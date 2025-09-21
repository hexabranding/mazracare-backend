import express from 'express';
import { verifyToken } from '../middlewares/auth.middleware.js';
import { addCategory, addService, deleteCategory, deleteService, getAllCategories, getAllServices, getCategoriesByService, getSingleCategory, getSingleService, updateCategory, updateService } from '../controllers/service.controller.js';
import upload from '../middlewares/multer.middleware.js';
import { authorizeRoles } from '../middlewares/role.middleware.js';
import { mediaUploader, uploader } from '../utils/multer.js';
import { uploadMediaToCloudinary, uploadToCloudinaryMultiple } from '../utils/cloudinary.js';

const serviceRouter=express.Router();

serviceRouter.post(
  '/add-service',
  verifyToken,
  authorizeRoles("Admin"),
  mediaUploader.fields([
    { name: 'image', maxCount: 5 },
    { name: 'video', maxCount: 5 }
  ]),
  uploadMediaToCloudinary({
    destinationPath: "services",
  }),
  addService
);


  serviceRouter.post(
    "/cloudinary",
    uploader.array("media", 5),
    uploadToCloudinaryMultiple({
      destinationPath: "reviews",
    }), (req, res) => {
      return res.json({ message: "File uploaded to Cloudinary", data: req.uploadedImages, code: 200 });
    });

      serviceRouter.post(
    "/media/cloudinary",
    mediaUploader.fields([
      { name: 'image', maxCount: 5 },
      { name: 'video', maxCount: 5 }
    ]),
    uploadMediaToCloudinary({
      destinationPath: "reviews",
    }), (req, res) => {
      return res.json({ message: "Media uploaded to Cloudinary", data: req.uploadedMedia, code: 200 });
    });




serviceRouter.post(
  '/add-category',
  verifyToken,
  authorizeRoles("Admin"),
  mediaUploader.fields([
    { name: 'image', maxCount: 1 },
    { name: 'video', maxCount: 1 }
  ]),
  uploadMediaToCloudinary({
    destinationPath: "categories",
  }),
  addCategory
);



serviceRouter.get(
  '/services',
  // verifyToken,
  getAllServices
);
serviceRouter.get(
  '/categories/:serviceId',
  // verifyToken,
  getCategoriesByService
);
serviceRouter.get(
  '/categories',
  // verifyToken,
  getAllCategories
);


// Update Service
serviceRouter.put(
  '/service/:id',
  verifyToken,
  authorizeRoles("Admin"),
  mediaUploader.fields([
    { name: 'image', maxCount: 5 },
    { name: 'video', maxCount: 5 }
  ]),
  uploadMediaToCloudinary({
    destinationPath: "services",
  }),
  updateService
);

// Update Category
serviceRouter.put(
  '/category/:id',
  verifyToken,
  authorizeRoles("Admin"),
  mediaUploader.fields([
    { name: 'image', maxCount: 1 },
    { name: 'video', maxCount: 1 }
  ]),
  uploadMediaToCloudinary({
    destinationPath: "categories",
  }),
  updateCategory
);

// Delete Service
serviceRouter.delete(
  '/service/:id',
  verifyToken,
  authorizeRoles("Admin"),
  deleteService
);

// Delete Category
serviceRouter.delete(
  '/category/:id',
  verifyToken,
  authorizeRoles("Admin"),
  deleteCategory
);


serviceRouter.get(
  '/category/:id',
  // verifyToken,
  // authorizeRoles("Admin"),
  getSingleCategory
);

serviceRouter.get(
  '/service/:id',
  // verifyToken,
  // authorizeRoles("Admin"),
  getSingleService
);




export default serviceRouter;