import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import connectDB from './data/db.js';
import productRouter from './routes/productsRoutes.js'
const port=process.env.PORT||5000
connectDB()
const app= express();
app.get('/',(req,res)=>{
    res.status(200).json({msg:"hi"})
})
app.use('/api/products',productRouter)

app.listen(port,()=>{
console.log('sever is running'+ port);
})