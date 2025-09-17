import multer from 'multer';
import path from 'path';

// Memory storage for direct Cloudinary upload
const storage = multer.memoryStorage();

// Accept image and video mime types
const fileFilter = (req, file, cb) => {
  const allowedImage = /jpeg|jpg|png|webp/;
  const allowedVideo = /mp4|mov|avi|mkv|webm/;

  const ext = path.extname(file.originalname).toLowerCase().slice(1);

  if (allowedImage.test(ext) || allowedVideo.test(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Unsupported file type'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { 
    fileSize: 20 * 1024 * 1024, // Max 20MB per file
    files: 10, // Max 10 files (5 images + 5 videos)
    fieldSize: 2 * 1024 * 1024 // Max 2MB for non-file fields
  },
});

export default upload;
