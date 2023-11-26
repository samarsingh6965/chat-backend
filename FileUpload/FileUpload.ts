import express, { Router } from 'express';
import multer from 'multer';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import config from '../firebase.config';
import ServerResponse from '../ServerResponse/ServerResponse'
const response = new ServerResponse();
const router: Router = express.Router();
initializeApp(config)
const firebase_storage = getStorage();
const upload = multer({ storage: multer.memoryStorage() });
// Configure Multer for file uploads
// const storage = multer.diskStorage({
//   destination: './uploads', // where to store the files
//   filename: function (req, file, callback) {
//     callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//   },
// });


// export default upload;
router.post("/", upload.single('image'), async (req:any, res:any) => {
  try {
      const dateTime = giveCurrentDateTime();

      const storageRef = ref(firebase_storage, `uploads/${req.file.originalname + "       " + dateTime}`);

      // Create file metadata including the content type
      const metadata = {
          contentType: req.file.mimetype,
      };

      // Upload the file in the bucket storage
      const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
      //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel

      // Grab the public url
      const downloadURL = await getDownloadURL(snapshot.ref);
      response.handleSuccess(res,
        {name: req.file.originalname,
        type: req.file.mimetype,
        url: downloadURL},'File successfully uploaded.')
  } catch (error) {
      return res.status(400).send(error.message)
  }
});

const giveCurrentDateTime = () => {
  const today = new Date();
  const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date + ' ' + time;
  return dateTime;
}

export default router;