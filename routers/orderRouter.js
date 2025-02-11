import express from 'express'
import { allOrders, placeOrder, placeOrderRazorpay, placeOrderStripe, updateStatus, userOrders, verifyStripe } from '../controllers/orderController.js'
import adminAuth from '../middlewares/adminAuth.js'
import authUser from '../middlewares/auth.js'

const Router = express.Router()

// Admin Features
Router.post('/list',adminAuth,allOrders)
Router.post('/status',adminAuth,updateStatus)

// Payment Features
Router.post('/place',authUser,placeOrder)
Router.post('/stripe',authUser,placeOrderStripe)
Router.post('/razorpay',authUser,placeOrderRazorpay)

// User Features
Router.post('/userorders',authUser,userOrders)

// verify payment
Router.post('/verifyStripe',authUser,verifyStripe)

export default Router

