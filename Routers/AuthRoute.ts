import express from "express";
const AuthRouter = express.Router();
import Auth from "../Controllers/Auth";
AuthRouter.post('/login', Auth.login);
AuthRouter.post('/register', Auth.register);
AuthRouter.get('/usernames', Auth.getUsername);
export default AuthRouter;