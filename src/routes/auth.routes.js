const {Router} = require('express');
const { registerUserController,loginUserController } = require('../controllers/auth.controller');
const authRoutes = Router();

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


module.exports = authRoutes;