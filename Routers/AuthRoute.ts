import express from "express";
const AuthRouter = express.Router();
import Auth from "../Controllers/Auth";
AuthRouter.post('/login', Auth.login);
export default AuthRouter;