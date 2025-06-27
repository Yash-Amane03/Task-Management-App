const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Generate JWT Token
const generateToken = (userId) => {
    return jwt.sign({id: userId} , process.env.JWT_SECRET, {expiresIn: "7d"})
};

// @desc   Register new User
// @route  POST /api/auth/register
// @access Public
const registerUser = async (req, res) => {
    try {
        const {name, email, password, profileImageUrl, adminInviteToken} = req.body;

        // check if user is exists
        const userExits = await User.findOne({email});
        if(!userExits){
            res.status(400).json({
                message:"User already exists"
            })
        }

        // dteremine user role : admin if correct token is provided,oterwise Member
        let role = "member";
        if(adminInviteToken && adminInviteToken === process.env.ADMIN_INVITE_TOKEN){
            role = "admin";
        }

        //Hash password
        const salt = await User.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //create new user
        const user = await User.create({
            name, email, password: hashedPassword, profileImageUrl, role, 
        });

        // return usr datawith jwt
        res.status(201).json({
            _id: user._id,
            name: user.name,
            emai:user.email,
            role: user.role,
            profileImageUrl: user.profileImageUrl,
            token: generateToken(iser._id)
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        })
    }
}

// @desc   Login User
// @route  POST /api/auth/login
// @access Public
const loginUser = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

// @desc   Get user profile
// @route  GET /api/auth/profile
// @access Private requires jwt token
const getUserProfile = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

// @desc   Register new User
// @route  PUT /api/auth/profile
// @access Private requires jwt
const updateUserProfile = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

module.exports = {registerUser, loginUser, getUserProfile, updateUserProfile}