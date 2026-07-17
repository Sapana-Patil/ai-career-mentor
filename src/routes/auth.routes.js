const {Router} = require('express');
const { registerUserController,loginUserController ,logoutUserController,getMeController} = require('../controllers/auth.controller');
const authRoutes = Router();
const { authUser } = require('../middleware/auth.middleware');

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */

authRoutes.post('/register',registerUserController);


/**
 * @route POST /api/auth/login
 * @description login a user
 * @access Public
 */
authRoutes.post('/login',loginUserController)

/**
 * @route POST /api/auth/logout
 * @description logout a user
 * @access Public
 */
authRoutes.post('/logout',logoutUserController)

/**
 * @route Get /api/auth/get-me
 * @description get me current logged in user
 * @access Private
 */
authRoutes.get('/get-me',authUser,getMeController)


module.exports = authRoutes;