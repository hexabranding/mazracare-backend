import cloudinary from '../config/cloudinary.js';

export const uploadToCloudinary = async (file, folder, resource_type = 'auto') => {
  const uploadOptions = {
    folder,
    resource_type,
    chunk_size: 10000000, // 10MB chunks for maximum speed
    timeout: 60000, // 1 minute timeout
    use_filename: false,
    unique_filename: true,
  };

  // Aggressive compression for images
  if (resource_type === 'image' || file.mimetype?.startsWith('image/')) {
    uploadOptions.quality = 'auto:low';
    uploadOptions.fetch_format = 'auto';
    uploadOptions.flags = 'progressive';
    uploadOptions.format = 'webp';
  }

  // Fast video optimization
  if (resource_type === 'video' || file.mimetype?.startsWith('video/')) {
    uploadOptions.quality = 'auto:low';
    uploadOptions.video_codec = 'h264';
    uploadOptions.bit_rate = '1m';
  }

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      uploadOptions,
      (error, result) => {
        if (error) reject(error);
        else resolve({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    );
    uploadStream.end(file.buffer);
  });
};

// High-speed batch upload with concurrency control
export const batchUploadToCloudinary = async (files, folder, resource_type = 'auto') => {
  const BATCH_SIZE = 3; // Process 3 files at once for optimal speed
  const results = [];
  
  for (let i = 0; i < files.length; i += BATCH_SIZE) {
    const batch = files.slice(i, i + BATCH_SIZE);
    const batchPromises = batch.map(file => uploadToCloudinary(file, folder, resource_type));
    const batchResults = await Promise.all(batchPromises);
    results.push(...batchResults);
  }
  
  return results;
};

// Ultra-fast upload for small batches
export const fastBatchUpload = async (files, folder, resource_type = 'auto') => {
  if (files.length <= 5) {
    return Promise.all(files.map(file => uploadToCloudinary(file, folder, resource_type)));
  }
  return batchUploadToCloudinary(files, folder, resource_type);
};