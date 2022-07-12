const { query } = require("express");
const express = require("express");
const Tour = require("../models/tourModel");

const getAllTours = async (req, res) => {
  try {
    // for getting these two condition
    // let data = await Tour.find({
    //   duration: 5,
    //   difficulty: "easy",
    // });

    // // own logic
    // // console.log(req.query);
    // let datas = req.query;
    // let data = await Tour.find(datas); // it also works

    // for getting another one --> price greater than 1500
    // let data = await Tour.find({ price: { $gte: 1500 } });

    // shallow copy
    // 1) FILTERING
    const queryObj = { ...req.query };
    // const excludeFields = ["sort", "page", "limit"];
    // excludeFields.forEach((el) => delete queryObj[el]);
    // // console.log(req.query, queryObj); // { difficulty: 'easy', duration: '5', page: '4' }
    // // { difficulty: 'easy', duration: '5' }

    // // 2) ADVANCED FILTERING
    // // { price: { $gte: "1500" } };
    // //{ price: { gte: '1500' } }

    let queryStr = JSON.stringify(queryObj);
    // // console.log(queryStr);
    // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    // // console.log(JSON.parse(queryStr));

    // // 3) sorting
    let query = Tour.find(JSON.parse(queryStr));
    if (req.query.sort) {
      let sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // 3) field limiting
    /// console.log(req.query.fields);
    if (req.query.fields) {
      const field = req.query.fields.split(",").join(" ");
      // console.log(field);
      query = query.select(field);
    } else {
      query = query.select("-__v"); // - is excluding;
    }

    // 4) Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 5;
    const skip = (page - 1) * limit;

    // page=2&limit=10
    // query = query.skip(1).limit(2);
    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const numTours = await Tour.countDocuments();
      if (skip >= numTours) throw new Error("This page doesnot exists");
    }

    // for display -----> execute section
    let data = await query;
    res.status(200).json({
      status: "Success",
      length: data.length,
      data,
    });
  } catch (err) {
    res.status(404).json({
      status: "Fail",
      message: err,
    });
  }
};

const getSpecificTour = async (req, res) => {
  try {
    let data = await Tour.find({ _id: req.params });
    res.status(200).json({
      status: "Success",
      data,
    });
  } catch (err) {
    res.status(404).json({
      status: "Fail",
      message: "Couldnot find this ID",
    });
  }
};

const createTour = async (req, res) => {
  try {
    let data = await Tour.create(req.body);
    res.status(200).json({
      status: "Success",
      message: "Successfully insert your data.",
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err.message,
    });
  }
};

const updateTour = async (req, res) => {
  try {
    let data = await Tour.updateOne({ _id: req.params }, { $set: req.body });
    // let data = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });
    // console.log(data); // gives null

    res.status(200).json({
      status: "Success",
      message: "Successfully update",
      data,
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err.message,
    });
  }
};

const deleteTour = async (req, res) => {
  try {
    // const data = await Tour.deleteOne({ _id: req.params });
    await Tour.findByIdAndDelete(req.params._id); // dont forget to keep '_id' ...
    res.status(200).json({
      status: "Success",
      message: "Delete successfully",
      // data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: "Something went wrong",
    });
  }
};

const searchTour = async (req, res) => {
  try {
    let data = await Tour.find({
      $or: [
        { name: { $regex: req.params.key } },
        // { difficulty: { $regex: req.params.key } }, // for search on multiple key ...
        // { name: { $regex: req.params.key } }
      ],
    });
    res.status(200).json({
      status: "Success",
      data,
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: "Couldnot find it",
    });
  }
};

module.exports = {
  getAllTours,
  createTour,
  getSpecificTour,
  updateTour,
  deleteTour,
  searchTour,
};
