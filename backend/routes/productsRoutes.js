import express from "express";
import { getAllProducts, getSingleProduct,createProduct, updateProduct } from "../controllers/productsControllers.js";
import {protectedRoute,adminMiddleware} from '../middleware/authMiddleware.js'

const router= express.Router()
router.route('/').get( getAllProducts).post(protectedRoute,adminMiddleware,createProduct)
router.route('/:id').get(getSingleProduct).put(protectedRoute,adminMiddleware,updateProduct)

export default router