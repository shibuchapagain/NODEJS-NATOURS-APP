const { query } = require("express");
const express = require("express");
const Tour = require("../models/tourModel");
const AppError = require("./../utils/appError");
const APIFeatures = require("./../utils/apiFeatures");
const cacheAsync = require("./../utils/catchAsync");

const getAllTours = cacheAsync(async (req, res, next) => {
  const features = new APIFeatures(Tour.find(), req.query).filter().sort();
  const tours = await features.query;
  res.status(200).json({
    status: "Success",
    length: tours.length,
    tours,
  });
});

const getSpecificTour = cacheAsync(async (req, res, next) => {
  let data = await Tour.findById(req.params._id);
  if (!data) {
    return next(new AppError("No tour found with that ID", 404));
  }
  res.status(200).json({
    status: "Success",
    data,
  });
});

const createTour = cacheAsync(async (req, res, next) => {
  await Tour.create(req.body);
  res.status(200).json({
    status: "Success",
    message: "Successfully insert your data.",
  });
});

const updateTour = cacheAsync(async (req, res, next) => {
  let data = await Tour.findByIdAndUpdate(req.params._id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!data) {
    return next(new AppError("No tour found with that ID", 404));
  }
  res.status(200).json({
    status: "Success",
    message: "Successfully update",
    data,
  });
});

const deleteTour = cacheAsync(async (req, res, next) => {
  const data = await Tour.findByIdAndDelete(req.params._id); // dont forget to keep '_id' ...
  if (!data) {
    return next(new AppError("No tour found with that ID", 404));
  }
  res.status(200).json({
    status: "Success",
    message: "Delete successfully",
    data: null,
  });
});

module.exports = {
  getAllTours,
  createTour,
  getSpecificTour,
  updateTour,
  deleteTour,
};
