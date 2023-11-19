// Sử dụng import thay vì require
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

const determineResourceType = (filename) => {
  const ext = path.extname(filename).toLowerCase();
  if (['.mp4', '.webm', '.ogg'].includes(ext)) {
    return 'video';
  }
  return 'image';
};

const determineFormat = (filename) => {
  const ext = path.extname(filename).toLowerCase();
  return ext.substring(1); // Remove the leading dot
};

// Unified storage configuration for both images and videos
const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => ({
    folder: determineResourceType(file.originalname) === 'video' ? "lesson_video" : "lesson_img",
    format: determineFormat(file.originalname),
    resource_type: determineResourceType(file.originalname)
  })
});

const uploadCloud = multer({ storage });

export default uploadCloud;
