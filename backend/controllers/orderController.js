import Order from "../models/order.js";
import asyncHandler from "../middleware/asyncHandler.js"
const createOrder=asyncHandler(async(req,res)=>{
    console.log(req.originalUrl);
    const {cartItems,shippingAddress,paymentAddress,itemsPrice,shippingPrice,totalPrice, taxPrice, paymentMethod }=req.body
    console.log('tax price '+taxPrice);
    console.log(req.body);
    if(cartItems&&cartItems.length===0){
        res.status(400)
        throw new Error('No order items')
    }else{
        console.log('else');
        const order= await Order.create({
            cartItems:cartItems.map((i)=>({name:i.name,quantity:i.quantity,image:i.image,price:i.price,product:i._id,_id:undefined })) , user:req.user._id,
            shippingAddress,paymentAddress,itemsPrice,taxPrice,shippingPrice, totalPrice, paymentMethod
        })
        console.log(order);

        res.status(201).json(order)
    }

      

})
const getMyOrder=asyncHandler(async(req,res)=>{
    console.log(req.body);
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
  const order= await Order.findById(req.params.id)
  if(order){
    order.isPaid=true
    order.paidAt=Date.now()
    order.paymentResult={
        id:req.body.id,
        status:req.body.status,
        update_time:req.body.update_time,
        email_address:req.body.payer.email_address
    }
    const updatedOrder= await order.save()
    res.status(200).json(updatedOrder)
  }else{
    res.status(404)
    throw new Error('Order not found')
  }

})
const updateOrderDeliverStatus=asyncHandler(async(req,res)=>{
   res.send('update order deliver status')

})
const getALLOrders=asyncHandler(async(req,res)=>{
    res.send('get all orders')
})
export {createOrder, updateOrderPaidStatus, updateOrderDeliverStatus, getALLOrders, getMyOrder, getOrderById}