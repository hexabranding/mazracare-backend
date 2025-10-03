import Service from '../models/service.model.js';
import catchAsync from '../middlewares/catchAsync.js';
import ApiError from '../utils/ApiError.js';
import { uploadToCloudinary, fastBatchUpload } from '../utils/cloudinary.upload.js';
import Category from '../models/category.model.js';
import cloudinary from '../config/cloudinary.js';

export const addService = catchAsync(async (req, res, next) => {
  const { name, description,heading,subHeading,subdescription } = req.body;

  if (!name || !description) {
    return next(new ApiError(400, 'Name and description are required'));
  }

  const exists = await Service.findOne({ name });
  if (exists) return next(new ApiError(400, 'Service already exists'));

  const imageUploads = req.uploadedMedia?.filter(media => media.mediaType === 'image') || [];
  const videoUploads = req.uploadedMedia?.filter(media => media.mediaType === 'video') || [];

  const service = await Service.create({
    name,
    description,
    heading,
    subHeading,
    subdescription,
    image: imageUploads,
    video: videoUploads,
  });

  res.status(201).json({
    success: true,
    data: service,
    message: 'Service created successfully',
  });
});



export const addCategory = catchAsync(async (req, res, next) => {
  const { name, description, service } = req.body;

  if (!name || !description || !service) {
    return next(new ApiError(400, 'Name, description, and service are required'));
  }

  const serviceExists = await Service.findById(service);
  if (!serviceExists) {
    return next(new ApiError(404, 'Service not found'));
  }

  const exists = await Category.findOne({ name });
  if (exists) return next(new ApiError(400, 'Category already exists'));

  const image = req.uploadedMedia?.find(media => media.mediaType === 'image') || {};
  const video = req.uploadedMedia?.find(media => media.mediaType === 'video') || {};

  const category = await Category.create({
    name,
    description,
    service,
    image,
    video,
  });

  res.status(201).json({
    success: true,
    data: category,
    message: 'Category created successfully',
  });
});


export const getAllServices = catchAsync(async (req, res, next) => {
  let { page = 1, limit = 10 } = req.query;
  page = parseInt(page);
  limit = parseInt(limit);

  const total = await Service.countDocuments();

  const services = await Service.find()
    .sort({ name: 1 })
    .skip((page - 1) * limit)
    .limit(limit);

  res.status(200).json({
    success: true,
    total,
    page,
    pages: Math.ceil(total / limit),
    data: services,
  });
});



export const getCategoriesByService = catchAsync(async (req, res, next) => {
  const { serviceId } = req.params;
  let { page = 1, limit = 10 } = req.query;
  page = parseInt(page);
  limit = parseInt(limit);

  const total = await Category.countDocuments({ service: serviceId });

  const categories = await Category.find({ service: serviceId })
    .sort({ name: 1 })
    .skip((page - 1) * limit)
    .limit(limit);

  res.status(200).json({
    success: true,
    total,
    page,
    pages: Math.ceil(total / limit),
    data: categories,
  });
});


export const getAllCategories = catchAsync(async (req, res, next) => {
  let { page = 1, limit = 10 } = req.query;
  page = parseInt(page);
  limit = parseInt(limit);

  const total = await Category.countDocuments();

  const categories = await Category.find()
    .sort({ name: 1 })
    .skip((page - 1) * limit)
    .limit(limit);

  res.status(200).json({
    success: true,
    total,
    page,
    pages: Math.ceil(total / limit),
    data: categories,
  });
});




export const updateService = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { name, description,heading,subHeading,subdescription } = req.body;

  const service = await Service.findById(id);
  if (!service) return next(new ApiError(404, 'Service not found'));

  if (name) service.name = name;
  if (description) service.description = description;
  if (heading) service.heading = heading;
  if (subHeading) service.subHeading = subHeading;
  if (subdescription) service.subdescription = subdescription;

  if (req.uploadedMedia) {
    const imageUploads = req.uploadedMedia.filter(media => media.mediaType === 'image');
    const videoUploads = req.uploadedMedia.filter(media => media.mediaType === 'video');
    
    if (imageUploads.length > 0) {
      // Delete old images
      if (service.image && service.image.length > 0) {
        await Promise.all(
          service.image.map(img => 
            img?.public_id ? cloudinary.uploader.destroy(img.public_id) : Promise.resolve()
          )
        );
      }
      service.image = imageUploads;
    }
    
    if (videoUploads.length > 0) {
      // Delete old videos
      if (service.video && service.video.length > 0) {
        await Promise.all(
          service.video.map(video => 
            video?.public_id ? cloudinary.uploader.destroy(video.public_id) : Promise.resolve()
          )
        );
      }
      service.video = videoUploads;
    }
  }
  
  await service.save();

  res.status(200).json({
    success: true,
    message: 'Service updated successfully',
    data: service,
  });
});



export const updateCategory = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { name, description, service: serviceId } = req.body;

  const category = await Category.findById(id);
  if (!category) return next(new ApiError(404, 'Category not found'));

  if (name) category.name = name;
  if (description) category.description = description;
  if (serviceId) {
    const exists = await Service.findById(serviceId);
    if (!exists) return next(new ApiError(404, 'New service not found'));
    category.service = serviceId;
  }

  if (req.uploadedMedia) {
    const imageUpload = req.uploadedMedia.find(media => media.mediaType === 'image');
    const videoUpload = req.uploadedMedia.find(media => media.mediaType === 'video');
    
    if (imageUpload) {
      if (category.image?.public_id) {
        await cloudinary.uploader.destroy(category.image.public_id);
      }
      category.image = imageUpload;
    }

    if (videoUpload) {
      if (category.video?.public_id) {
        await cloudinary.uploader.destroy(category.video.public_id);
      }
      category.video = videoUpload;
    }
  }

  await category.save();

  res.status(200).json({
    success: true,
    message: 'Category updated successfully',
    data: category,
  });
});



export const deleteService = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const  service = await Service.findById(id);
  if (!service) return next(new ApiError(404, 'Service not found'));

  // Delete Cloudinary media
  if (Array.isArray(service.image)) {
  for (const img of service.image) {
    if (img?.public_id) {
      await cloudinary.uploader.destroy(img.public_id);
    }
  }
}
  if (Array.isArray(service.video)) {
  for (const video of service.video) {
    if (video?.public_id) {
      await cloudinary.uploader.destroy(video.public_id);
    }
  }
}

  // Optional: delete categories under this service
  await Category.deleteMany({ service: id });

  await Service.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    message: 'Service and its categories deleted successfully',
  });
});



export const deleteCategory = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const category = await Category.findById(id);
  if (!category) return next(new ApiError(404, 'Category not found'));

  if (category.image?.public_id) {
    await cloudinary.uploader.destroy(category.image.public_id);
  }
  if (category.video?.public_id) {
    await cloudinary.uploader.destroy(category.video.public_id);
  }

  await Category.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    message: 'Category deleted successfully',
  });
});




export const getSingleService = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const service = await Service.findById(id);
  if (!service) return next(new ApiError(404, 'Service not found'));

  res.status(200).json({
    success: true,
    data: service,
  });
});




export const getSingleCategory = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const category = await Category.findById(id).populate('service', 'name');
  if (!category) return next(new ApiError(404, 'Category not found'));

  res.status(200).json({
    success: true,
    data: category,
  });
});

// Remove specific file from Cloudinary (Admin only)
export const removeCloudinaryFile = catchAsync(async (req, res, next) => {
  const { public_id } = req.body;

  if (!public_id) {
    return next(new ApiError(400, 'Public ID is required'));
  }

  await cloudinary.uploader.destroy(public_id);

  res.status(200).json({
    success: true,
    message: 'File removed successfully from Cloudinary',
  });
});
