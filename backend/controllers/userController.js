const Task = require("../models/Task");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// @desc   get all users (admin only)
// @route  GET /api/users
// @access Private (admin)
const getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "member" }).select("-password");

    // add task count to each other
    const usersWithTaskCOunts = await Promise.all(
      users.map(async (user) => {
        const pendingTasks = await Task.countDocuments({
          assignedTo: user._id,
          status: "pending",
        });
        const inProgressTasks = await Task.countDocuments({
          assignedTo: user._id,
          status: "in progress",
        });
        const completedTasks = await Task.countDocuments({
          assignedTo: user._id,
          status: "completed",
        });
        return {
          ...user._doc,
          pendingTasks,
          inProgressTasks,
          completedTasks,
        };
      })
    );
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc   get specific user by ID (admin only)
// @route  GET /api/users/:id
// @access Private
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if(!user){
        return res.status(404).json({message: "User not found"});
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// // @desc   delete specific users by their id (admin only)
// // @route  delete /api/users/:id
// // @access Private (admin)
// const deleteUser = async (req, res) => {
//   try {
//     const user = User.findById(req.params.id).select("-password");

//     if(!user){
//         return res.status(404).json({message: "User not found."})
//     }

//     user.deleteOne();
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

module.exports = { getUsers, getUserById };
