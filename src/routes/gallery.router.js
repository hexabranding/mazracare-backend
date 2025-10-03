import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import cloudinaryUpload from "../middlewares/cloudinary-multer.middleware.js";
import {
  createGalleryItem,
  deleteGalleryItem,
  getAllGalleryItems,
  getGalleryItemById,
  updateGalleryItem,
} from "../controllers/gallery.controller.js";

const galleryRouter = express.Router();

// Post apis
galleryRouter.post(
  "/",
  verifyToken,
  authorizeRoles("Admin"),
  cloudinaryUpload.single("image"),
  createGalleryItem
);

// Put apis
galleryRouter.put(
  "/:id",
  verifyToken,
  authorizeRoles("Admin"),
  cloudinaryUpload.single("image"),
  updateGalleryItem
);

// Get apis
galleryRouter.get("/", getAllGalleryItems);
galleryRouter.get("/:id", getGalleryItemById);

// Delete apis
galleryRouter.delete("/:id", verifyToken, authorizeRoles("Admin"), deleteGalleryItem);

export default galleryRouter;