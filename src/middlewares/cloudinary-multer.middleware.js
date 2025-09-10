import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';
import path from 'path';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'products',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'mp4', 'mov', 'avi'],
    transformation: [
      { width: 1024, quality: 70, crop: 'limit' }
    ]
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp|mp4|mov|avi|mkv|webm/;
  const ext = path.extname(file.originalname).toLowerCase().slice(1);
  
  if (allowedTypes.test(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Unsupported file type'), false);
  }
};

const cloudinaryUpload = multer({
  storage,
  fileFilter,
  limits: { 
    fileSize: 20 * 1024 * 1024,
    files: 5
  },
});

export default cloudinaryUpload;