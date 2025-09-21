import multer from "multer";

const storage = multer.memoryStorage()
export const uploader = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|bmp|webp|tiff|svg)$/i)) {
      return cb(new Error('Only image files are allowed!'));
    }

    cb(null, true);
  },
});

export const mediaUploader = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const isImage = file.originalname.match(/\.(jpg|jpeg|png|gif|bmp|webp|tiff|svg)$/i);
    const isVideo = file.originalname.match(/\.(mp4|avi|mov|wmv|flv|webm|mkv)$/i);
    if (!isImage && !isVideo) {
      return cb(new Error('Only image and video files are allowed!'));
    }
    cb(null, true);
  },
});