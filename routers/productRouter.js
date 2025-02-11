import express from 'express'
import { addProduct, getCategory, listProduct, removeProduct, singleProduct } from '../controllers/productController.js'
import upload from '../middlewares/multer.js'
import adminAuth from '../middlewares/adminAuth.js'

const Router = express.Router()

Router.post('/add',adminAuth,upload.fields([{name :'image1',maxCount : 1 },{name :'image2',maxCount : 1 },{name :'image3',maxCount : 1 },{name :'image4',maxCount : 1 }]),addProduct)
Router.get('/list',listProduct)
Router.post('/remove',adminAuth,removeProduct)
Router.get('/single',singleProduct)
Router.post('/category',getCategory)

export default Router 