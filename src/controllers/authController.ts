import jwt from "jsonwebtoken";
import User from "../models/User";
import catchAsync from "../utils/catchAsync";
import { validationResult } from "express-validator";
import { config } from "../config/config";
import AppError from "../utils/AppError";

const signToken = (id: string) => {
  // console.log("User id".red, id);
  return jwt.sign({ id }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRES_IN,
  });
};

export const signup = catchAsync(async (req, res, next) => {
  // check validator
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  // create users
  const newUser = await User.create(req.body);
  if (!newUser) {
    return next(new AppError("Sign up failed when creating User", 500));
  }

  const token = signToken(newUser._id);

  res.status(201).json({ token, user: newUser });
});

export const login = catchAsync(async (req, res, next) => {
  // check validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  const { email, password } = req.body;
  // 2) Check if user exists && passord is correct
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await User.correctPassword(password, user.password))) {
    return res.status(401).json({
      success: false,
      errors: [{ msg: "Invalid email and password " }],
    });
  }

  // 3) If everything ok, send token to client
  const token = signToken(user._id);
  res.status(200).json({
    token,
    user,
  });
});

export default {
  signup,
  login,
};
