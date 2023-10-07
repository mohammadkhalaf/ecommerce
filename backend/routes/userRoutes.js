import express from "express";
import { deleteUser, updateUser, updateUserProfile, getUserById, getUserProfile, getUsers, authUser, logoutUser,registerUser} from '../controllers/userController.js'
import {protectedRoute, adminMiddleware} from '../middleware/authMiddleware.js'
const router= express.Router()

router.route('/').post(registerUser).get(protectedRoute,adminMiddleware, getUsers)
router.post('/logout', logoutUser)
router.post('/auth', authUser)
router.route('/profile').get(protectedRoute, getUserProfile).put(protectedRoute, updateUserProfile)
router.route('/:id').delete(protectedRoute,adminMiddleware, deleteUser).get(protectedRoute,adminMiddleware,getUserById).put(protectedRoute,adminMiddleware,updateUser)
export default router