import express from "express";
import cors from "cors";
import user from "../Router/user";
import category from "../Router/category"
import product from "../Router/product";
import comment from "../Router/comment";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"
import rating from '../Router/rating'
dotenv.config();
const app = express();
app.use(cookieParser())
const { API } = process.env;
app.set('view engine', 'ejs');
app.use(express.json());
app.use(cors());
app.use("/api", user);
app.use("/api",category)
app.use("/api",product)
app.use("/api",rating)
app.use("/api",comment)
mongoose.connect(API);

export const viteNodeApp = app;
