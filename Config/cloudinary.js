const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Set up multer storage with cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads/resume', // Folder name in Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg', 'pdf'], // allowed file types
    transformation: [{ width: 500, height: 500, crop: 'limit' }] // optional
  }
});

module.exports = {
  cloudinary,
  storage
};