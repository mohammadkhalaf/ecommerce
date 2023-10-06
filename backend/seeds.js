import mongoose from "mongoose";
import dotenv from 'dotenv';
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/user.js" ;
import Product from './models/products.js';
import Order from "./models/order.js";
import connectDB from "./data/db.js";
dotenv.config()
connectDB()
const importData=async()=>{
    try {
         await User.deleteMany()
         await Order.deleteMany()
         await Product.deleteMany()
         const createdUsers= await  User.insertMany(users)
         const adminUser= createdUsers[0]._id
         const createdProducts= products.map((product)=>{
             return {...product, user:adminUser}
           }) 
          await Product.insertMany(createdProducts)
        console.log('data imported');
        process.exit()

        
    } catch (error) {
        console.log('error');

           process.exit(1)
        
    }

}
const destroyData=async()=>{
    try {
        await User.deleteMany()
        await Order.deleteMany()
        await Product.deleteMany()
        process.exit()
        
    } catch (error) {
        process.exit(1)
        
    }

}
if(process.argv[2]==='-d'){
    destroyData()
}else{
    importData()
}