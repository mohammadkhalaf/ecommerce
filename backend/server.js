import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
dotenv.config()
import connectDB from './data/db.js';
import productRouter from './routes/productsRoutes.js'
import userRouter from './routes/userRoutes.js'
import orderRouter from './routes/orderRoutes.js'
import { notFound, errorHandler } from './middleware/notFoundError.js';

const port=process.env.PORT||5000
connectDB()
const app= express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.get('/',(req,res)=>{
    res.status(200).json({msg:"hi"})
})
app.use('/api/products',productRouter)
app.use('/api/users',userRouter)
app.use('/api/orders', orderRouter)
app.get('/api/config/paypal',(req,res)=>{
    res.send({clientId:process.env.PAYPAL_CLIENT_ID})
})
app.use(notFound)
app.use(errorHandler)

app.listen(port,()=>{
console.log('sever is running'+ port);
})