import express from 'express'
import connectDB from './configs/db.js'
import 'dotenv/config'
import cors from 'cors'
import userRouter from './routers/userRouter.js'
import productRouter from './routers/productRouter.js'
import cartRouter from './routers/cartRouter.js'
import orderRouter from './routers/orderRouter.js'

const app = express()

const PORT = 4000 || process.env.PORT

const corsConfig = {
    origin:'*',
    Credential : '',
    methods : ['GET','POST','PUT','DELETE']
}

app.use(cors(corsConfig))
app.options("",cors(corsConfig))

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