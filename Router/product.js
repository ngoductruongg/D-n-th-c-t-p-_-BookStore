import express from "express"
import uploadCloud from "../middlewares/uploader";
import { create,getAll,getOne,remove,update, getFreeProducts, getProductsByPrice } from "../controllers/product";
const router = express.Router()
router.post('/product',uploadCloud.single('img'),create);
router.get('/product',getAll);
router.get('/product/:id',getOne);
router.get('/products/price',getProductsByPrice);
router.get('/products/free',getFreeProducts);
router.delete('/product/:id',remove);
router.get('/products/price',getProductsByPrice);
router.get('/products/free',getFreeProducts);
router.put('/product/:id',uploadCloud.single('img'),update,(err, req, res, next) => {
    if (err) {
        console.log(err);
      res.status(500).json({ error: err.message });
    }
  })
export default router;