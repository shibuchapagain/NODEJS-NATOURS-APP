const express = require("express");
require("./config");
const tourSchema = require("./tourSchema");

const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
  let data = await tourSchema.find();
  //   console.log(data);
  res.send(data);
});

app.get("/:_id", async (req, res) => {
  let data = await tourSchema.find({ _id: req.params });
  console.log(data);
  res.send(data);
});

const getAllTours = async (req, res) => {
  let data = await tourSchema.find();
  try {
    res.status(200).json({
      status: "Success",
      data,
    });
  } catch (err) {
    res.status(404).json({
      status: "Fail",
      message: err,
    });
  }
};

app.get("/search/:key", async (req, res) => {
  let data = await tourSchema.find({
    $or: [
      { name: { $regex: req.params.key } },
      // { difficulty: { $regex: req.params.key } }, // for search on multiple key ...
      // { name: { $regex: req.params.key } }
    ],
  });
  //   console.log(data);
  res.send(data);
});

app.post("/create", async (req, res) => {
  let data = new tourSchema(req.body);
  let result = await data.save();
  //   console.log(result);
  res.send(result);
});

app.patch("/update/:_id", async (req, res) => {
  let data = await tourSchema.updateOne(
    { _id: req.params },
    { $set: req.body }
  );
  //   console.log(data);
  res.send(data);
});

app.delete("/delete/:_id", async (req, res) => {
  let data = await tourSchema.deleteOne({ _id: req.params });
  //   console.log(data);
  res.send(data);
});

app.listen(8000, () => {
  console.log("SERVER AT 8000");
});
