import catchAsync from '../middlewares/catchAsync.js';
import Product from '../models/product.model.js';
import ApiError from '../utils/ApiError.js';

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

  // Files are already uploaded to Cloudinary via middleware
  const uploadedImages = req.files.map(file => ({
    url: file.path, // Cloudinary URL
    public_id: file.filename // Cloudinary public_id
  }));

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