import express from "express";
const Router = express.Router();
import MessageController from "../Controllers/MessageController";

Router.get('/getMessages', MessageController.getMessages);
export default Router;