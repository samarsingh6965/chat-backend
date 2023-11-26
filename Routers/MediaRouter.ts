import express from "express";
const MediaRouter = express.Router();
import uploadRoute from '../FileUpload/FileUpload'

MediaRouter.use('/addMedia', uploadRoute);
export default MediaRouter;