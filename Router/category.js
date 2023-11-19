import express from "express"
import { create,getAll,getOne,remove,update } from "../controllers/category";
const router = express.Router()
router.post('/category',create);
router.get('/category',getAll);
router.get('/category/:id',getOne);
router.delete('/category/:id',remove);
router.put('/category/:id',update);
export default router;