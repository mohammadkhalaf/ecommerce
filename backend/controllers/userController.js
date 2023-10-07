import asyncHandler from "../middleware/asyncHandler.js"
import User from '../models/user.js'
import jwt from 'jsonwebtoken'

const authUser=asyncHandler( async(req,res)=>{
const{email, password}=req.body
const user= await User.findOne({email})
const token= jwt.sign({
 userId:user._id
}, process.env.JWT_SECRET, { expiresIn:'5d' });
res.cookie('jwt', token,{
    httpOnly:true,
    secure:process.env.NODE_ENV!=='development',
    sameSite:'strict',
    maxAge:1*24*60*60*1000

})
if(user &&( await user.matchPassword(password))){
    res.json({
        _id:user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin
    })

}else{
    res.status(401)
    throw new Error('Invalid email')
}
})
const registerUser=asyncHandler( async(req,res)=>{
   res.send('register user') 
})
const logoutUser=asyncHandler( async(req,res)=>{
    res.cookie('jwt','',{
        httpOnly:true,
        expires:new Date(0)
    } )
   res.status(200).json({msg:'logged out'}) 
})
const getUserProfile=asyncHandler( async(req,res)=>{
   res.send('profile get') 
})
const updateUserProfile=asyncHandler( async(req,res)=>{
   res.send('update user pfolile ') 
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