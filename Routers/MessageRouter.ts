import express from "express";
const MessageRouter = express.Router();
import MessageController from "../Controllers/MessageController";
MessageRouter.get('/getMessages', MessageController.getMessages);
export default MessageRouter;