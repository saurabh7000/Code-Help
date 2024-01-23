const userModel = require("../models/userModel");
const errorResponse = require("../utils/erroResponse");
const dotenv = require("dotenv");
dotenv.config();

// JWT Token
exports.sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken(res);
  res.status(statusCode).json({
    success: true,
    token,
  });
};

//Register
exports.registerController = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    //existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return next(new errorResponse("Email is already registered", 500));
    }
    const user = await userModel.create({ username, email, password });
    this.sendToken(user, 201, res);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//Login
exports.loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //validation
    if (!email || !password) {
      return next(new errorResponse("Please provide email or password"));
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return next(new errorResponse("Invalid Creditial", 401));
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return next(new errorResponse("Invalid Creditial", 401));
    }

    //res
    this.sendToken(user, 200, res);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.logoutController = async (req, res, next) => {
  res.clearCookie("refreshToken");
  return res.status(200).json({
    success: true,
    message: "Logout successfully",
  });
};
