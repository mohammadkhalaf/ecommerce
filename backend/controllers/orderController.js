import Order from "../models/order.js";
import asyncHandler from "../middleware/asyncHandler.js"
const createOrder=asyncHandler(async(req,res)=>{
    const {cartItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice,totalPrice}=req.body;
    if(cartItems&&cartItems.length===0){
        res.status(400)
        throw new Error('No order items')

    }else{
        const order= new Order({
            orderItems:cartItems.map((i)=>({...i,product:i._id,_id:undefined})),
            user:req.user._id,shippingAddress,paymentMethod,itemsPrice,taxPrice,totalPrice,shippingPrice
        })
        const createdOrder= await order.save()

        res.send(200).json(createOrder)
    }

})
const getMyOrder=asyncHandler(async(req,res)=>{
const orders= await Order.find({user:req.user._id})
if(orders){
    res.status(200).json(orders)
}else{
    res.status(400)
   throw new Error('Order not found')
}


})
const getOrderById=asyncHandler(async(req,res)=>{
    const order= await Order.findById(req.params.id).populate('user','name email')
    if(order){
        res.status(200).json(order)
    }else{
        res.status(400)
        throw new Error('Order not found')
    }
   

})
const updateOrderPaidStatus=asyncHandler(async(req,res)=>{
   res.send('update order paid status')

})
const updateOrderDeliverStatus=asyncHandler(async(req,res)=>{
   res.send('update order deliver status')

})
const getALLOrders=asyncHandler(async(req,res)=>{
    res.send('get all orders')
})
export {createOrder, updateOrderPaidStatus, updateOrderDeliverStatus, getALLOrders, getMyOrder, getOrderById}