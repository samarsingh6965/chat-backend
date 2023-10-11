import express from "express";
import path from 'path';
const Api = express();
import { verifyToken } from "./JWT";
// routes
import AuthRouter from "./Routers/AuthRoute";
import MediaRouter from "./Routers/MediaRouter";
import UserRouter from "./Routers/UserRouter";
import MessageRouter from "./Routers/MessageRouter";
import NotificationRouter from "./Routers/NotificationRouter";
// login
Api.use('/auth', AuthRouter);
Api.use('/uploads', express.static('uploads'));
Api.use(verifyToken)
Api.use('/user',UserRouter);
Api.use('/message',MessageRouter);
Api.use('/notification',NotificationRouter);
// other crud
Api.use('/media', MediaRouter);
export default Api;