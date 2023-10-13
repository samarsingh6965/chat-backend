// imageUploadRoute.js
import multer from 'multer';
import path from 'path';

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: './uploads', // where to store the files
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage }).single('image');

export default upload;