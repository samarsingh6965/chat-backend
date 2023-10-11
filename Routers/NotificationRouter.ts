import express from "express";
const NotificationRouter = express.Router();
import NotificationController from "../Controllers/NotificationController";
NotificationRouter.get('/getNotifications', NotificationController.getNotifications);
NotificationRouter.put('/updateNotifications', NotificationController.updateNotifications);
export default NotificationRouter;