import express from "express";

import { GetAllUser,forgotPassword, GetOneUser, Login, SignUp,DeleteUser, resetPassword, changePassword, getCurrent,refreshAccessToken,logout,updateUser } from "../controllers/user";
import { verifyAccessToken } from "../middlewares/verifyToken";
const Router = express.Router();
Router.post("/SignUp", SignUp);
Router.post("/Signin", Login);
Router.get('/current', verifyAccessToken, getCurrent);
Router.post('/refreshtoken', verifyAccessToken, refreshAccessToken);
Router.get('/logout', logout);
Router.get("/user", GetAllUser);
Router.get("/user/:id", GetOneUser);
Router.delete("/user/:id", DeleteUser);
Router.post("/forgotPassword", forgotPassword);
Router.post("/resetPassword", resetPassword);
Router.post("/changePassword", changePassword);
Router.put("/user/:id", updateUser);
export default Router;
