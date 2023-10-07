import express from "express";
const UserRouter = express.Router();
import UserController from "../Controllers/UserController";
UserRouter.put('/editPersnolDetail', UserController.editPersnolDetail);
UserRouter.get('/getUsers', UserController.getUsers);
export default UserRouter;