const mongoose = require("mongoose");
require("./config");
const { float, boolean } = require("webidl-conversions");

const tourSchema = new mongoose.Schema({
  name: String,
  price: Number,
  rating: Number,
  difficulty: String,
  premium: Boolean,
});

module.exports = mongoose.model("tours", tourSchema);
