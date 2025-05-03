const multer = require('multer');
const path = require('path');

// Set Storage Engine
const { storage } = require('../Config/cloudinary'); // adjust path if needed

const upload = multer({ storage });


// File Filter to accept only PDF or DOCX
// const fileFilter = (req, file, cb) => {
//     const fileTypes = /pdf|doc|docx|jpg;
//     const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
//     const mimeType = fileTypes.test(file.mimetype);

//     if (extName && mimeType) {
//         return cb(null, true);
//     } else {
//         return cb(new Error('Only .pdf, .doc, .docx files are allowed!'));
//     }
// };

// Multer Upload Middleware


module.exports = upload;