import express from "express";
import { getAllProducts, getSingleProduct,createProduct } from "../controllers/productsControllers.js";
import {protectedRoute,adminMiddleware} from '../middleware/authMiddleware.js'

const router= express.Router()
router.route('/').get( getAllProducts).post(protectedRoute,adminMiddleware,createProduct)
router.get('/:id',getSingleProduct)

export default router