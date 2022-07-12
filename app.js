const express = require("express");
const app = express();
const tourRouter = require("./routes/tourRoutes");

app.use(express.json());

app.use("/", tourRouter);

// error handling for all routes
app.use("*", (req, res, next) => {
  // simplest method to display message for wrong hit url
  res.status(400).json({
    status: "fail",
    message: `Cant't find ${req.originalUrl} this url on server!`,
  });
  next();

  // another way
  // const error = new Error(`Cant't find ${req.originalUrl} this url on server!`);
  // error.statusCode = 404;
  // error.status = "Fail";
  // res.send(error.message);

  //
  // next(error);
});

// Global error handling middleware
app.use((err, req, res, next) => {
  (err.statusCode = err.statusCode || 500),
    (err.status = err.status || "Fail"),
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  next();
});

app.listen(8000, () => {
  console.log("SERVER STARTED AT 8000");
});
