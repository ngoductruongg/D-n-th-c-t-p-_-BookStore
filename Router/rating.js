import mongoose from "mongoose";
import express from 'express'
import { createRating , updateRatingtatus, deleteRating  , getAllRatings , getRatingById , getProductRatings } from '../controllers/rating'
import { CheckPermission } from "../middlewares/CheckPermission";

const router = express.Router()

router.get('/rating',getAllRatings)
router.get('/rating/:id',getRatingById)
router.get('/product/:_id/ratings',getProductRatings)
router.post('/rating',createRating)
router.put('/rating/:id',updateRatingtatus)
router.delete('/rating/:id',deleteRating)


export default router