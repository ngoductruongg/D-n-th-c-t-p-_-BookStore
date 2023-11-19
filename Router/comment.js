import express from "express";

import { create,getCoursesForIdproduct,getAll,DeleteComment } from "../controllers/comment";
const Router = express.Router();
Router.post('/comment',create);
Router.get('/comment',getAll);
Router.delete("/comment/:id",DeleteComment);
Router.get('/comment/:idproduct',getCoursesForIdproduct);
export default Router;