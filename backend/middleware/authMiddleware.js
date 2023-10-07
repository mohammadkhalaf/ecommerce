import jwt from 'jsonwebtoken'
import asyncHandler from './asyncHandler.js'
import User from '../models/user.js'

 const protectedRoute=asyncHandler(async(req,res,next)=>{
    let token
    token = req.cookies.jwt
    if(token){
        try {
            const decoded= jwt.verify(token, process.env.JWT_SECRET)
            req.user= await User.findById(decoded.userId).select('-password')
            next()
        } catch (error) {
             res.status(401)
             throw new Error ('Not authorized user')         
        }
    }else{
        res.status(401)
        throw new Error ('Not authorized user')

    }
})
const adminMiddleware=(req,res,next)=>{
    if(req.user&&req.user.isAdmin){
        next()
    }else{
        res.status(401)
        throw new Error('Not authorized as admin')
    }
}
export {adminMiddleware, protectedRoute}