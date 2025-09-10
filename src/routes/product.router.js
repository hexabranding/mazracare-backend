import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import upload from "../middlewares/multer.middleware.js";
import cloudinaryUpload from "../middlewares/cloudinary-multer.middleware.js";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductBySlug,
  getProductsByCategory,
  updateProduct,
} from "../controllers/product.controller.js";

const productRouter = express.Router();

//Post apis

productRouter.post(
  "/",
  verifyToken,
  authorizeRoles("Admin"),
  cloudinaryUpload.array("images", 5), // Direct Cloudinary upload
  createProduct
);


//Put apis

productRouter.put(
  "/:id",
  verifyToken,
  authorizeRoles("Admin"),
  cloudinaryUpload.array("images", 5),
  updateProduct
);


//Get apis
productRouter.get("/", getAllProducts);
productRouter.get("/category/:categoryId", getProductsByCategory);
productRouter.get("/:slug", getProductBySlug);

//Delete apis
productRouter.delete("/:id",verifyToken,authorizeRoles("Admin"),deleteProduct)




export default productRouter;
