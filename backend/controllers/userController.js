import asyncHandler from "../middleware/asyncHandler.js"
import User from '../models/user.js'
import generateToken from "../utils/generateToken.js"

const authUser=asyncHandler( async(req,res)=>{
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
})
const registerUser=asyncHandler( async(req,res)=>{
    const {email, name, password}=req.body
    const userExist= await User.findOne({email})
    if(userExist){
        res.status(400)
        throw new Error('User is already exist')
    }
    const user= await User.create({
        name, email, password
    })
    if(user){
        generateToken(res,user._id)
        res.status(201).json({
        _id:user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin
        })
        
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }

})
const logoutUser=asyncHandler( async(req,res)=>{
    res.cookie('jwt','',{
        httpOnly:true,
        expires:new Date(0)
    } )
   res.status(200).json({msg:'logged out'}) 
})
const getUserProfile=asyncHandler( async(req,res)=>{
    const user= await User.findById(req.user._id)
    if(user){
        res.status(200).json({
        _id:user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin

        })
    }else{
        res.status(404)
        throw new Error('user is not found')
    }
})
const updateUserProfile=asyncHandler( async(req,res)=>{
      const user= await User.findById(req.user._id)
    if(user){
      user.name=req.body.name||user.name
      user.email=req.body.email||user.email
      if(req.body.password){
        user.password=req.body.password
      }
      const updateUser= await user.save()
      res.status(200).json({
        _id:updateUser._id,
        name:updateUser.name,
        email:updateUser.email,
        isAdmin:updateUser.isAdmin
      })
    }else{
        res.status(404)
        throw new Error ('User is not found')
    }
})
const getUsers=asyncHandler( async(req,res)=>{
   res.send('get users') 
})
const getUserById=asyncHandler( async(req,res)=>{
   res.send('get user by id') 
})
const updateUser=asyncHandler( async(req,res)=>{
   res.send('update user by admin') 
})
const deleteUser=asyncHandler( async(req,res)=>{
   res.send('delete user') 
})
export{
    deleteUser, updateUser, updateUserProfile, getUserById, getUserProfile, getUsers, authUser, logoutUser,registerUser
}