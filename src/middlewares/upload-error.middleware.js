import ApiError from '../utils/ApiError.js';

export const handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return next(new ApiError(413, 'File too large. Maximum size is 20MB'));
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      return next(new ApiError(400, 'Too many files. Maximum is 5 files'));
    }
    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      return next(new ApiError(400, 'Unexpected field name'));
    }
  }
  
  if (err.message === 'Unsupported file type') {
    return next(new ApiError(400, 'Unsupported file type. Only images and videos are allowed'));
  }
  
  next(err);
};