import express from "express";
const MediaRouter = express.Router();
import upload from '../FileUpload/FileUpload'; 

import MediaController from "../Controllers/MediaController";
MediaRouter.post('/addMedia',upload, MediaController.createMedia);
MediaRouter.delete('/deleteMediaPermanent', MediaController.deleteMediaPermanent);
export default MediaRouter;