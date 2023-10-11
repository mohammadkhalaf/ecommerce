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
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'product name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'product description',
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});
export {getAllProducts,getSingleProduct, createProduct, updateProduct}
