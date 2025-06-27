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
        
    } catch (error) {
        
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