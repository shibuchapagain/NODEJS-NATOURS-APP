const mongoose = require("mongoose");
require("../config");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: "String",
    trim: true,
    required: [true, "Please tell us your name"],
  },
  email: {
    type: "String",
    trim: true,
    unique: true,
    required: [true, "Please provide your email"],
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: "String",
    minLength: 8,
    required: [true, "Please provide a password"],
    select: false,
  },
  passwordConfirm: {
    type: "String",
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Password are not same",
    },
  },
});

// ENCRYPT OR HASH THE PASSWORD
userSchema.pre("save", async function (next) {
  // if the password modified then only hash otherwise not
  if (!this.isModified("password")) return next();
  // hash the password with cost 12
  this.password = await bcrypt.hash(this.password, 12);
  // delete passwordConfirmed fields
  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model("users", userSchema);
module.exports = User;
