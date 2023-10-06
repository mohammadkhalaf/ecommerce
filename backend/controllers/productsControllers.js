import Product from "../models/products.js";
import asyncHandler from "../middleware/asyncHandler.js"
const getAllProducts=asyncHandler(async(req,res)=>{
      console.log(req.originalUrl);
      const products= await Product.find({})
     res.json(products)

})

const getSingleProduct=asyncHandler(async(req,res)=>{
    const product =await Product.findById(req.params.id) 
if(product){
    res.json(product)
}else{
    res.status(404)
    throw new Error('Product not found')
}
})
export {getAllProducts,getSingleProduct}
