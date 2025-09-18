import cloudinary from '../config/cloudinary.js';

export const uploadToCloudinary = async (file, folder, resource_type = 'auto') => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder, resource_type },
      (error, result) => {
        if (error) reject(error);
        else resolve({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    ).end(file.buffer);
  });
};