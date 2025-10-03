import cloudinary from '../config/cloudinary.js';
import catchAsync from '../middlewares/catchAsync.js';
import Gallery from '../models/gallery.model.js';
import ApiError from '../utils/ApiError.js';

export const createGalleryItem = catchAsync(async (req, res, next) => {
  const { title, description } = req.body;

  if (!req.file) {
    return next(new ApiError(400, 'Image is required'));
  }

  const galleryItem = await Gallery.create({
    title,
    description,
    image: {
      url: req.file.path,
      public_id: req.file.filename
    }
  });

  res.status(201).json({
    success: true,
    data: galleryItem,
    message: 'Gallery item created successfully',
  });
});

export const getAllGalleryItems = catchAsync(async (req, res, next) => {
  let { page = 1, limit = 10, keyword = '' } = req.query;

  page = parseInt(page);
  limit = parseInt(limit);

  const filter = {
    title: { $regex: keyword, $options: 'i' },
  };

  const total = await Gallery.countDocuments(filter);

  const galleryItems = await Gallery.find(filter)
    .sort('-createdAt')
    .skip((page - 1) * limit)
    .limit(limit);

  res.status(200).json({
    success: true,
    total,
    page,
    pages: Math.ceil(total / limit),
    data: galleryItems,
  });
});

export const getGalleryItemById = catchAsync(async (req, res, next) => {
  const galleryItem = await Gallery.findById(req.params.id);

  if (!galleryItem) {
    return next(new ApiError(404, 'Gallery item not found'));
  }

  res.status(200).json({
    success: true,
    data: galleryItem,
  });
});

export const updateGalleryItem = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { title, description } = req.body;

  let galleryItem = await Gallery.findById(id);
  if (!galleryItem) return next(new ApiError(404, 'Gallery item not found'));

  // Handle image replacement
  if (req.file) {
    // Delete existing Cloudinary image
    if (galleryItem.image.public_id) {
      await cloudinary.uploader.destroy(galleryItem.image.public_id);
    }

    galleryItem.image = {
      url: req.file.path,
      public_id: req.file.filename
    };
  }

  // Update fields
  galleryItem.title = title || galleryItem.title;
  galleryItem.description = description || galleryItem.description;

  await galleryItem.save();

  res.status(200).json({
    success: true,
    data: galleryItem,
    message: 'Gallery item updated successfully',
  });
});

export const deleteGalleryItem = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const galleryItem = await Gallery.findById(id);
  if (!galleryItem) return next(new ApiError(404, 'Gallery item not found'));

  // Delete image from Cloudinary
  if (galleryItem.image.public_id) {
    await cloudinary.uploader.destroy(galleryItem.image.public_id);
  }

  await Gallery.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    message: 'Gallery item deleted successfully',
  });
});