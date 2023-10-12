import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
dotenv.config()
import connectDB from './data/db.js';
import productRouter from './routes/productsRoutes.js'
import userRouter from './routes/userRoutes.js'
import orderRouter from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import { notFound, errorHandler } from './middleware/notFoundError.js';


const port=process.env.PORT||5000
connectDB()
const app= express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use('/api/products',productRouter)
app.use('/api/users',userRouter)
app.use('/api/orders', orderRouter)
app.use('/api/upload',uploadRoutes )
app.get('/api/config/paypal',(req,res)=>{
    res.send({clientId:process.env.PAYPAL_CLIENT_ID})
})
const __dirname=path.resolve()
app.use('/uploads',express.static(path.join(__dirname,'/uploads')))
app.use(notFound)
app.use(errorHandler)

app.listen(port,()=>{
console.log('sever is running'+ port);
})