const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

// const signToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRES_IN,
//   });
// };

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(201).json({
    status: "Success",
    data: {
      token,
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  // 1) CHECK IF EMAIL AND PASSWORD EXISTS OR NOT:
  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  // 2) CHECK IF EMAIL AND PASSWORD ARE CORRECT OR NOT:
  const user = await User.findOne({ email }).select("+password");
  // console.log(user); // display the details about this email with password as well
  // console.log(password); // display the user enter password for login
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email and password", 401));
  }

  // 3) IF EVERYTHING OK THEN:
  // const token=
  res.status(200).json({
    status: "Success",
  });
});
