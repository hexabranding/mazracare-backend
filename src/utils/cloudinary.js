import { v2 as cloudinary } from 'cloudinary';
import { asyncErrorHandler } from 'express-error-catcher';
import sharp from 'sharp';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const generateRandomString = (length) => {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const uploadToCloudinaryMultiple = ({
  destinationPath = "default",
  compressWidth = 1000,
  compressQuality = 80,
}) =>
  asyncErrorHandler(async (req, res, next) => {
    if (!req.files || req.files.length === 0) {
      return next();
    }

    const uploadedImages = [];

    for (const file of req.files) {
      const compressedBuffer = await sharp(file.buffer)
        .resize({ width: compressWidth })
        .jpeg({ quality: compressQuality })
        .toBuffer();

      const timestamp = Date.now();
      const randomString = generateRandomString(10);
      const publicId = `${destinationPath}/${timestamp}-${randomString}`;

      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            public_id: publicId,
            resource_type: 'image',
            folder: destinationPath,
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(compressedBuffer);
      });

      uploadedImages.push({
        filePath: uploadResult.secure_url,
        fileName: uploadResult.public_id,
        fileType: file.mimetype,
        key: uploadResult.public_id,
        cloudinaryId: uploadResult.public_id,
      });
    }

    req.uploadedImages = uploadedImages;
    next();
  });


  
export const uploadMediaToCloudinary = ({
  destinationPath = "default",
  compressWidth = 1000,
  compressQuality = 80,
}) =>
  asyncErrorHandler(async (req, res, next) => {
    if (!req.files) {
      return next();
    }

    const uploadedMedia = [];
    const allFiles = [];
    
    // Handle both array and object structures
    if (Array.isArray(req.files)) {
      allFiles.push(...req.files);
    } else {
      // Handle fields structure
      if (req.files.image) allFiles.push(...req.files.image);
      if (req.files.video) allFiles.push(...req.files.video);
    }
    
    if (allFiles.length === 0) {
      return next();
    }

    const images = allFiles.filter(file => file.mimetype.startsWith('image/'));
    const videos = allFiles.filter(file => file.mimetype.startsWith('video/'));

    if (images.length > 5 || videos.length > 5) {
      return res.status(400).json({ message: "Maximum 5 images and 5 videos allowed" });
    }

    for (const file of allFiles) {
      const timestamp = Date.now();
      const randomString = generateRandomString(10);
      const publicId = `${destinationPath}/${timestamp}-${randomString}`;
      const isImage = file.mimetype.startsWith('image/');
      
      let uploadResult;
      
      if (isImage) {
        const compressedBuffer = await sharp(file.buffer)
          .resize({ width: compressWidth })
          .jpeg({ quality: compressQuality })
          .toBuffer();
          
        uploadResult = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            {
              public_id: publicId,
              resource_type: 'image',
              folder: destinationPath,
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          ).end(compressedBuffer);
        });
      } else {
        uploadResult = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            {
              public_id: publicId,
              resource_type: 'video',
              folder: destinationPath,
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          ).end(file.buffer);
        });
      }

      uploadedMedia.push({
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
        fileType: file.mimetype,
        mediaType: isImage ? 'image' : 'video',
      });
    }

    req.uploadedMedia = uploadedMedia;
    next();
  });