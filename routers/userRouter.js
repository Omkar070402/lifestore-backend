import express from 'express'
import { adminLogin, loginUser, registerUser } from '../controllers/userController.js'


const Router  = express.Router()

Router.post('/register',registerUser)
Router.post('/login',loginUser)
Router.post('/adminLogin',adminLogin)


export default Router;