import express from 'express'
import authMiddleware from '../middlewares/auth.js'
import {placeOrder} from '../controllers/orderController.js'

const orderRouter= express.Router();

orderRouter.post("/", authMiddleware, placeOrder);

export default orderRouter