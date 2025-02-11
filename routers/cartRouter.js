import express from 'express'
import { addToCart, getToCart, updateToCart } from '../controllers/cartController.js'
import authUser from '../middlewares/auth.js'

const Router = express.Router()

Router.post('/add',authUser,addToCart)
Router.post('/update',authUser,updateToCart)
Router.post('/get',authUser,getToCart)

export default Router