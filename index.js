import express from 'express'
import connectDB from './configs/db.js'
import 'dotenv/config'
import cors from 'cors'
import userRouter from './routers/userRouter.js'
import productRouter from './routers/productRouter.js'
import cartRouter from './routers/cartRouter.js'
import orderRouter from './routers/orderRouter.js'

const app = express()

const PORT = process.env.PORT || 8080


// middlewares
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
    credentials: true
  }));
app.use(express.json())




//database
connectDB() 


app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)

app.get('/',(req,res)=>{
    res.send('Server working') 
})

app.listen(PORT,()=>{
    console.log(`server is running on PORT:${PORT}`)
})