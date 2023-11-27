import express, { Router } from 'express';
import multer from 'multer';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, getDownloadURL, uploadBytesResumable, deleteObject } from 'firebase/storage'
import config from '../firebase.config';
import ServerResponse from '../ServerResponse/ServerResponse';
const response = new ServerResponse();
const router: Router = express.Router();
const app = initializeApp(config)
const firebase_storage = getStorage(app);
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single('image'), async (req: any, res: any) => {
  try {
    const dateTime = giveCurrentDateTime();

    const storageRef = ref(firebase_storage, `uploads/${req.file.originalname + "       " + dateTime}`);

    const metadata = {
      contentType: req.file.mimetype,
    };

    const uploadTask = uploadBytesResumable(storageRef, req.file.buffer, metadata);

    // Emit upload progress using Socket.IO
    uploadTask.on("state_changed", (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    });

    const snapshot = await uploadTask;
    const downloadURL = await getDownloadURL(snapshot.ref);

    response.handleSuccess(res, {
      name: req.file.originalname,
      type: req.file.mimetype,
      url: downloadURL
    }, 'File successfully uploaded.');
  } catch (error) {
    return res.status(400).send(error.message)
  }
});

router.delete("/", async (req: any, res: any) => {
  try {
    const { downloadUrl } = req.body;
    const deleteRef = ref(firebase_storage, downloadUrl);
    const deletedImage = await deleteObject(deleteRef);
    response.handleSuccess(res, deletedImage, 'File successfully deleted.')
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