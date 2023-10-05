import express from "express";
import path from 'path';
const Api = express();
import { verifyToken } from "./JWT";
// routes
import AuthRouter from "./Routers/AuthRoute";
import MediaRouter from "./Routers/MediaRouter";
// login
Api.use('/auth', AuthRouter);
Api.use('/uploads', express.static('uploads'));
Api.use(verifyToken)
// other crud
Api.use('/media', MediaRouter);
export default Api;