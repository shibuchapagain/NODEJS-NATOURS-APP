const mongoose = require("mongoose");
require("../config");
const { float, boolean } = require("webidl-conversions");

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A tour must have a name"],
    unique: true,
    trim: true,
    minlength: [6, "A tour name must contains 6 character"],
    maxlength: [25, "A tour name contains maximum 25 character"],
  },
  slug: String,
  duration: {
    type: String,
    required: [true, "A tour must have a duration"],
  },
  maxGroupSize: {
    type: Number,
    required: [true, "A tour must have a group size"],
  },
  difficulty: {
    type: String,
    required: [true, "A tour must have a difficulty"],
    enum: {
      values: ["easy", "medium", "difficult"],
      message: "couldnot set others then easy, medium and difficulty",
    },
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
    min: [1, "Cant set minimum rating below 1"],
    max: [5, "Maximum rating cant be set above 5"],
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, "A toue must have a price"],
  },
  priceDiscount: {
    type: Number,
    validate: {
      validator: function (val) {
        return val < this.price;
      },
      message: "Discount price should be below than original price",
    },
  },
  summary: {
    type: String,
    trim: true,
    required: [true, "A tour must have summary"],
  },
  description: {
    type: String,
    required: [true, "A tour must have description"],
  },
  imageCover: {
    type: String,
    required: [true, "A tour must have image cover"],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    // select: false,
  },
  startDates: [Date],
  //   secretTour: {
  //     type: boolean,
  //     default: false,
  //   },
  // },
  // {
  //   toJSON: { virtuals: true },
  //   toObject: { virtuals: true },
  // }
});

// For virtual properties
tourSchema.virtual("durationweeks").get(function () {
  this.duration / 7;
});
// module.exports = mongoose.model("tours", tourSchema);
const Tour = mongoose.model("tours", tourSchema);
module.exports = Tour;
