const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const redisClient = require('../config/redis');
/**
 * @name registerUserController
 * @description Controller to handle user registration,accepts username ,email and password from the request body and creates a new user in the database.
 * @access Public
 */
async function registerUserController(req, res) {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const existingUser = await userModel.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            if (existingUser.username === username) {
                return res.status(400).json({ message: 'Username already exists' });
            }
            if (existingUser.email === email) {
                return res.status(400).json({ message: 'Email already exists' });
            }
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await userModel.create({ username, email, password: hashedPassword });

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.cookie("token", token)

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
            }
        });


    }
    catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

/**
 * @name loginUserController
 * @description Controller to handle user login, accepts email and password from the request body and authenticates the user.
 * @access Public
 */
async function loginUserController(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.cookie("token", token)
        res.status(200).json({
            message: 'User logged in successfully',
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            }
        });

    }
    catch (error) {
        console.log("Error loginIn user:", error)
        res.status(500).json({ message: 'Server error' });
    }
}

/**
 * @name logoutUserController
 * @description Controller to handle user logout, clears the authentication token from the cookies and blacklists the token in Redis.
 * @access Public
 */
async function logoutUserController(req, res) {
    try{
        const token = req.cookies.token;
        if(token){
            await redisClient.setEx(token, 86400, 'blacklisted');
        }
        res.clearCookie('token');
        res.status(200).json({ message: 'User logged out successfully' });
    }
    catch (error) {
        console.error("Error logging out user:", error);
        res.status(500).json({ message: 'Server error' });
    }
}

/**
 * @name getMeController
 * @description Controller to get the current logged-in user's information.
 * @access Private
 */
async function getMeController(req, res) {
    try{
        const user=await userModel.findById(req.user.id)

        res.status(200).json({
            message: 'User fetched successfully',
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            }
        });
    }
    catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = { registerUserController, loginUserController ,logoutUserController,getMeController};
