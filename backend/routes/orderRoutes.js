import express from "express";
import { createOrder, updateOrderPaidStatus, updateOrderDeliverStatus, getALLOrders, getMyOrder, getOrderById} from '../controllers/orderController.js'
import {protectedRoute, adminMiddleware} from '../middleware/authMiddleware.js'
const router= express.Router()

router.route('/').post(protectedRoute,createOrder).get(protectedRoute,adminMiddleware, getALLOrders)
router.route('/myorder').get(protectedRoute,getMyOrder)
router.route('/:id').get(protectedRoute,getOrderById)
router.route('/:id/pay').put(protectedRoute,updateOrderPaidStatus)
router.route('/:id/deliver').put(protectedRoute,adminMiddleware,updateOrderDeliverStatus)
export default router