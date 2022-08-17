const express = require("express");
const app = express();

// most important
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
app.use(express.json());

app.use("/api/tour", tourRouter);
app.use("/api/user", userRouter);

// error handling for all routes
app.use("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

app.listen(8000, () => {
  console.log("SERVER STARTED AT 8000");
});
