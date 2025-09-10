import cloudinary from '../config/cloudinary.js';
import catchAsync from '../middlewares/catchAsync.js';
import Product from '../models/product.model.js';
import ApiError from '../utils/ApiError.js';
import sharp from 'sharp';
import fs from 'fs/promises';
import slugify from 'slugify';
import Cart from '../models/cart.model.js';
import Wishlist from '../models/wishlist.model.js';
import { isNull } from '../utils/functions.js';

export const createProduct = catchAsync(async (req, res, next) => {
  const {
    name,
    description,
    price,
    service,
    discountPercent,
    category,
    stock,
    isFeatured,
    usp
  } = req.body;

  if (!name || !description || !price || !service || !category || !stock) {
    return next(new ApiError(400, 'Missing required product fields'));
  }

  if (!req.files || req.files.length === 0) {
    return next(new ApiError(400, 'Product images are required'));
  }

  const uploadedImages = [];

  try {
    for (const file of req.files) {
      const compressedPath = `uploads/compressed-${file.filename}`;

      await sharp(file.path)
        .resize(1024)
        .jpeg({ quality: 70 })
        .toFile(compressedPath);

      const result = await cloudinary.uploader.upload(compressedPath, {
        folder: 'products',
      });

      uploadedImages.push({
        url: result.secure_url,
        public_id: result.public_id,
      });

      // Delete files with error handling
      try {
        await fs.unlink(file.path);
        await fs.unlink(compressedPath);
      } catch (unlinkError) {
        console.warn('File cleanup warning:', unlinkError.message);
      }
    }
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, 'Image upload failed'));
  }

  const product = await Product.create({
    name,
    description,
    price,
    discountPercent,
    service,
    category,
    stock,
    isFeatured,
    images: uploadedImages,
    usp,
  });

  res.status(201).json({
    success: true,
    data: product,
    message: 'Product created successfully',
  });
});



export const getAllProducts = catchAsync(async (req, res, next) => {
  let {
    page = 1,
    limit = 10,
    keyword = '',
    category,
    service,
    sort = '-createdAt',
  } = req.query;

  page = parseInt(page);
  limit = parseInt(limit);

  const filter = {
    name: { $regex: keyword, $options: 'i' }, // letter-by-letter filter
  };

  if (!isNull(category)) filter.category = category;
  if (!isNull(service)) filter.service = service;

  const total = await Product.countDocuments(filter);

  const products = await Product.find(filter)
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(limit);

  res.status(200).json({
    success: true,
    total,
    page,
    pages: Math.ceil(total / limit),
    data: products,
  });
});



export const getProductBySlug = catchAsync(async (req, res, next) => {
  const product = await Product.findOne({ slug: req.params.slug });

  if (!product) {
    return next(new ApiError(404, 'Product not found'));
  }

  res.status(200).json({
    success: true,
    data: product,
  });
});




export const updateProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  let product = await Product.findById(id);
  if (!product) return next(new ApiError(404, 'Product not found'));

  const {
    name,
    description,
    price,
    discountPercent,
    service,
    category,
    stock,
    isFeatured,
    usp,
  } = req.body;

  // Handle image replacement
  const newImages = [];

  if (req.files && req.files.length > 0) {
    // Delete existing Cloudinary images
    for (const img of product.images) {
      await cloudinary.uploader.destroy(img.public_id);
    }

    // Upload new compressed images
    for (const file of req.files) {
      const compressedPath = `uploads/compressed-${file.filename}`;
      await sharp(file.path)
        .resize(1024)
        .jpeg({ quality: 70 })
        .toFile(compressedPath);

      const result = await cloudinary.uploader.upload(compressedPath, {
        folder: 'products',
      });

      newImages.push({
        url: result.secure_url,
        public_id: result.public_id,
      });

      // Delete files with error handling
      try {
        await fs.unlink(file.path);
        await fs.unlink(compressedPath);
      } catch (unlinkError) {
        console.warn('File cleanup warning:', unlinkError.message);
      }
    }
  }

  // Update product fields
  product.name = name || product.name;
  product.description = description || product.description;
  product.price = price || product.price;
  product.discountPercent = discountPercent || product.discountPercent;
  product.service = service || product.service;
  product.category = category || product.category;
  product.stock = stock || product.stock;
  product.isFeatured = isFeatured !== undefined ? isFeatured : product.isFeatured;
  product.usp = usp || product.usp;
  if (newImages.length > 0) product.images = newImages;

  // Update slug if name changes
  if (name) {
    product.slug = slugify(name, { lower: true, strict: true });
  }

  await product.save();

  res.status(200).json({
    success: true,
    data: product,
    message: 'Product updated successfully',
  });
});



export const deleteProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findById(id);
  if (!product) return next(new ApiError(404, 'Product not found'));

  // 1. Delete images from Cloudinary
  for (const img of product.images) {
    await cloudinary.uploader.destroy(img.public_id);
  }

  // 2. Delete the product from DB
  await Product.findByIdAndDelete(id);

  // 3. Remove the product from all carts
  await Cart.updateMany(
    { 'items.product': id },
    { $pull: { items: { product: id } } }
  );

  // 4. Remove the product from all wishlists
  await Wishlist.updateMany(
    { products: id },
    { $pull: { products: id } }
  );

  res.status(200).json({
    success: true,
    message: 'Product deleted successfully and removed from all carts/wishlists',
  });
});




export const getProductsByCategory = catchAsync(async (req, res, next) => {
  let { page = 1, limit = 10, keyword = '', sort = '-createdAt' } = req.query;
  
  page = parseInt(page);
  limit = parseInt(limit);

  // Build the filter criteria including the provided category id and optional keyword
  const filter = {
    name: { $regex: keyword, $options: 'i' },
  };

  const total = await Product.countDocuments(filter);

  const products = await Product.find(filter)
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(limit);

  res.status(200).json({
    success: true,
    total,
    page,
    pages: Math.ceil(total / limit),
    data: products,
  });
});
